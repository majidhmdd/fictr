import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { teamRegistrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET handler - Fetch single registration by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Validate ID is a valid integer
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required" 
      }, { status: 400 });
    }
    
    const registration = await db.select()
      .from(teamRegistrations)
      .where(eq(teamRegistrations.id, parseInt(id)))
      .limit(1);
    
    if (registration.length === 0) {
      return NextResponse.json({ 
        error: "Registration not found" 
      }, { status: 404 });
    }
    
    return NextResponse.json(registration[0]);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}