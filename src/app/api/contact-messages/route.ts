import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { contactMessages } from '@/db/schema';
import { desc } from 'drizzle-orm';

const MAX_LIMIT = 100;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 5000;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), MAX_LIMIT);
    const offset = parseInt(searchParams.get('offset') || '0');

    const messages = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(messages);
  } catch (error) {
    console.error('GET contact messages error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required and must be a non-empty string', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json(
        { error: 'Email is required and must be a non-empty string', code: 'MISSING_EMAIL' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string', code: 'MISSING_MESSAGE' },
        { status: 400 }
      );
    }

    // Trim inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();

    // Validate field lengths
    if (trimmedName.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Name must be ${MAX_NAME_LENGTH} characters or less`, code: 'NAME_TOO_LONG' },
        { status: 400 }
      );
    }

    if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { error: `Email must be ${MAX_EMAIL_LENGTH} characters or less`, code: 'EMAIL_TOO_LONG' },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or less`, code: 'MESSAGE_TOO_LONG' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Email must be a valid email address', code: 'INVALID_EMAIL' },
        { status: 400 }
      );
    }

    // Create the contact message
    const newMessage = await db
      .insert(contactMessages)
      .values({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newMessage[0], { status: 201 });
  } catch (error) {
    console.error('POST contact message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}