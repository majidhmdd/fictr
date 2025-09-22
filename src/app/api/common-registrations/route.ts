import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { commonRegistrations } from '@/db/schema';
import { eq, like, and, or, desc, asc } from 'drizzle-orm';
import nodemailer from 'nodemailer';

const TOURNAMENT_LABELS: Record<string, string> = {
  'valley-esports-2025': 'Valley Esports 2025',
  'future-tournaments': 'Future Tournaments'
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      leader_name,
      leader_phone,
      leader_email,
      tournament,
      send_email
    } = body;

    if (!leader_name || typeof leader_name !== 'string' || leader_name.trim().length === 0) {
      return NextResponse.json({
        error: 'Leader name is required',
        code: 'MISSING_LEADER_NAME'
      }, { status: 400 });
    }

    if (leader_name.length > 100) {
      return NextResponse.json({
        error: 'Leader name must be 100 characters or less',
        code: 'INVALID_LEADER_NAME_LENGTH'
      }, { status: 400 });
    }

    if (!leader_phone || typeof leader_phone !== 'string') {
      return NextResponse.json({
        error: 'Leader phone is required',
        code: 'MISSING_LEADER_PHONE'
      }, { status: 400 });
    }

    if (!isValidPhone(leader_phone)) {
      return NextResponse.json({
        error: 'Leader phone must be exactly 10 digits',
        code: 'INVALID_LEADER_PHONE'
      }, { status: 400 });
    }

    if (!leader_email || typeof leader_email !== 'string') {
      return NextResponse.json({
        error: 'Leader email is required',
        code: 'MISSING_LEADER_EMAIL'
      }, { status: 400 });
    }

    if (!isValidEmail(leader_email)) {
      return NextResponse.json({
        error: 'Leader email must be valid',
        code: 'INVALID_LEADER_EMAIL'
      }, { status: 400 });
    }

    if (!tournament || typeof tournament !== 'string') {
      return NextResponse.json({
        error: 'Tournament is required',
        code: 'MISSING_TOURNAMENT'
      }, { status: 400 });
    }

    if (!['valley-esports-2025', 'future-tournaments'].includes(tournament)) {
      return NextResponse.json({
        error: 'Tournament must be valley-esports-2025 or future-tournaments',
        code: 'INVALID_TOURNAMENT'
      }, { status: 400 });
    }

    const sendEmail = send_email === true;
    const createdAt = Date.now();

    const [newRegistration] = await db.insert(commonRegistrations)
      .values({
        leaderName: leader_name.trim(),
        leaderPhone: leader_phone.trim(),
        leaderEmail: leader_email.trim().toLowerCase(),
        tournament,
        sendEmail,
        createdAt
      })
      .returning();

    let emailSent = false;

    if (sendEmail) {
      try {
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const smtpFrom = process.env.SMTP_FROM;

        if (smtpHost && smtpPort && smtpUser && smtpPass && smtpFrom) {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass
            }
          });

          const tournamentLabel = TOURNAMENT_LABELS[tournament] || tournament;
          const subject = 'Fictr Registration Confirmation';
          const body = `Thanks ${leader_name} for registering for ${tournamentLabel}. We will be in touch soon.`;

          await transporter.sendMail({
            from: smtpFrom,
            to: leader_email.trim().toLowerCase(),
            subject,
            text: body
          });

          emailSent = true;
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    return NextResponse.json({
      id: newRegistration.id,
      message: 'Registration created successfully',
      emailSent
    }, { status: 201 });

  } catch (error) {
    console.error('POST /api/common-registrations error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    const registrations = await db.select()
      .from(commonRegistrations)
      .orderBy(desc(commonRegistrations.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(registrations, { status: 200 });

  } catch (error) {
    console.error('GET /api/common-registrations error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}