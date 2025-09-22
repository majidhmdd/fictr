import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { commonRegistrations } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({
        error: "Valid ID is required",
        code: "INVALID_ID"
      }, { status: 400 });
    }

    const result = await db
      .select()
      .from(commonRegistrations)
      .where(eq(commonRegistrations.id, id))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({
        error: "Registration not found",
        code: "NOT_FOUND"
      }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('GET registration error:', error);
    return NextResponse.json({
      error: "Internal server error",
      code: "INTERNAL_ERROR"
    }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({
        error: "Valid ID is required",
        code: "INVALID_ID"
      }, { status: 400 });
    }

    const body = await request.json();
    const updates: any = {};

    // Validate leaderName if provided
    if (body.leader_name !== undefined) {
      const trimmedName = body.leader_name.trim();
      if (!trimmedName) {
        return NextResponse.json({
          error: "Leader name cannot be empty",
          code: "INVALID_LEADER_NAME"
        }, { status: 400 });
      }
      if (trimmedName.length > 100) {
        return NextResponse.json({
          error: "Leader name cannot exceed 100 characters",
          code: "LEADER_NAME_TOO_LONG"
        }, { status: 400 });
      }
      updates.leaderName = trimmedName;
    }

    // Validate leaderPhone if provided
    if (body.leader_phone !== undefined) {
      const phone = body.leader_phone;
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(phone)) {
        return NextResponse.json({
          error: "Leader phone must be exactly 10 digits",
          code: "INVALID_LEADER_PHONE"
        }, { status: 400 });
      }
      updates.leaderPhone = phone;
    }

    // Validate leaderEmail if provided
    if (body.leader_email !== undefined) {
      const email = body.leader_email.trim().toLowerCase();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        return NextResponse.json({
          error: "Leader email must be a valid email format",
          code: "INVALID_LEADER_EMAIL"
        }, { status: 400 });
      }
      updates.leaderEmail = email;
    }

    // Validate tournament if provided
    if (body.tournament !== undefined) {
      const allowedTournaments = ["valley-esports-2025", "future-tournaments"];
      const tournament = body.tournament.trim();
      if (!allowedTournaments.includes(tournament)) {
        return NextResponse.json({
          error: 'Tournament must be either "valley-esports-2025" or "future-tournaments"',
          code: "INVALID_TOURNAMENT"
        }, { status: 400 });
      }
      updates.tournament = tournament;
    }

    // Validate sendEmail if provided
    if (body.send_email !== undefined) {
      if (typeof body.send_email !== 'boolean') {
        return NextResponse.json({
          error: "Send email must be a boolean value",
          code: "INVALID_SEND_EMAIL"
        }, { status: 400 });
      }
      updates.sendEmail = body.send_email;
    }

    // Check if no valid fields to update
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({
        error: "No valid fields provided for update",
        code: "NO_FIELDS_TO_UPDATE"
      }, { status: 400 });
    }

    // Update the record
    const result = await db
      .update(commonRegistrations)
      .set(updates)
      .where(eq(commonRegistrations.id, id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({
        error: "Registration not found",
        code: "NOT_FOUND"
      }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('PATCH registration error:', error);
    return NextResponse.json({
      error: "Internal server error",
      code: "INTERNAL_ERROR"
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({
        error: "Valid ID is required",
        code: "INVALID_ID"
      }, { status: 400 });
    }

    const result = await db
      .delete(commonRegistrations)
      .where(eq(commonRegistrations.id, id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({
        error: "Registration not found",
        code: "NOT_FOUND"
      }, { status: 404 });
    }

    return NextResponse.json({
      message: "Registration deleted successfully",
      deleted: result[0]
    });
  } catch (error) {
    console.error('DELETE registration error:', error);
    return NextResponse.json({
      error: "Internal server error",
      code: "INTERNAL_ERROR"
    }, { status: 500 });
  }
}