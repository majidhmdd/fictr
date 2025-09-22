import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { paymentConfirmations } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate all required fields are present
    if (!body.name || !body.email || !body.phone || 
        body.received_confirmation === undefined || !body.tournament_slug) {
      return NextResponse.json({
        error: 'All fields are required',
        code: 'MISSING_REQUIRED_FIELDS'
      }, { status: 400 });
    }

    const { name, email, phone, received_confirmation, tournament_slug } = body;

    // Validate name
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 1 || trimmedName.length > 100) {
      return NextResponse.json({
        error: 'Name must be between 1 and 100 characters',
        code: 'INVALID_NAME'
      }, { status: 400 });
    }

    // Validate email
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({
        error: 'Invalid email format',
        code: 'INVALID_EMAIL'
      }, { status: 400 });
    }

    // Validate phone (remove non-digits and check length)
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
      return NextResponse.json({
        error: 'Phone must contain 7-15 digits',
        code: 'INVALID_PHONE'
      }, { status: 400 });
    }

    // Validate received_confirmation must be true
    if (received_confirmation !== true) {
      return NextResponse.json({
        error: 'You must confirm you received the email',
        code: 'CONFIRMATION_REQUIRED'
      }, { status: 400 });
    }

    // Validate tournament_slug
    const trimmedTournamentSlug = tournament_slug.trim();
    if (!trimmedTournamentSlug || trimmedTournamentSlug.length < 1 || trimmedTournamentSlug.length > 100) {
      return NextResponse.json({
        error: 'Tournament slug must be between 1 and 100 characters',
        code: 'INVALID_TOURNAMENT_SLUG'
      }, { status: 400 });
    }

    const newConfirmation = await db.insert(paymentConfirmations).values({
      name: trimmedName,
      email: trimmedEmail,
      phone: cleanedPhone,
      receivedConfirmation: received_confirmation ? 1 : 0,
      tournamentSlug: trimmedTournamentSlug,
      createdAt: Date.now()
    }).returning();

    return NextResponse.json(newConfirmation[0], { status: 201 });
    
  } catch (error) {
    console.error('POST payment_confirmations error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tournamentSlug = searchParams.get('tournament_slug');
    // Parse and clamp limit to avoid driver issues with parameterized LIMIT
    const parsedLimit = Number(searchParams.get('limit') ?? '50');
    const safeLimit = Number.isFinite(parsedLimit) && parsedLimit > 0 && parsedLimit <= 500
      ? Math.floor(parsedLimit)
      : 50;

    let results;
    if (tournamentSlug) {
      results = await db
        .select()
        .from(paymentConfirmations)
        .where(eq(paymentConfirmations.tournamentSlug, tournamentSlug))
        .orderBy(desc(paymentConfirmations.createdAt))
        .limit(safeLimit);
    } else {
      results = await db
        .select()
        .from(paymentConfirmations)
        .orderBy(desc(paymentConfirmations.createdAt))
        .limit(safeLimit);
    }

    return NextResponse.json(results, { status: 200 });
    
  } catch (error) {
    console.error('GET payment_confirmations error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}