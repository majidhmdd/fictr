import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { teamRegistrations } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone validation regex - allows digits, spaces, dashes, parentheses
const phoneRegex = /^[\d\s\-\(\)\+]{10,15}$/;

// POST handler - Create registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { team_name, leader_name, player_details, contact, tournament_slug, willing_to_pay } = body;
    
    // Validate required fields
    if (!team_name || typeof team_name !== 'string' || !team_name.trim()) {
      return NextResponse.json({ 
        error: "Team name is required and must be a non-empty string" 
      }, { status: 400 });
    }
    
    if (!leader_name || typeof leader_name !== 'string' || !leader_name.trim()) {
      return NextResponse.json({ 
        error: "Leader name is required and must be a non-empty string" 
      }, { status: 400 });
    }
    
    if (!player_details || typeof player_details !== 'string' || !player_details.trim()) {
      return NextResponse.json({ 
        error: "Player details are required and must be a non-empty string" 
      }, { status: 400 });
    }
    
    if (!contact || typeof contact !== 'string' || !contact.trim()) {
      return NextResponse.json({ 
        error: "Contact is required and must be a non-empty string" 
      }, { status: 400 });
    }
    
    // Validate willing_to_pay - must be present and true
    if (willing_to_pay !== true) {
      return NextResponse.json({ 
        error: "You must confirm your team's willingness to pay the tournament fee" 
      }, { status: 400 });
    }
    
    // Trim and validate lengths
    const trimmedTeamName = team_name.trim();
    const trimmedLeaderName = leader_name.trim();
    const trimmedPlayerDetails = player_details.trim();
    const trimmedContact = contact.trim();
    
    if (trimmedTeamName.length > 100) {
      return NextResponse.json({ 
        error: "Team name must be 100 characters or less" 
      }, { status: 400 });
    }
    
    if (trimmedLeaderName.length > 100) {
      return NextResponse.json({ 
        error: "Leader name must be 100 characters or less" 
      }, { status: 400 });
    }
    
    if (trimmedPlayerDetails.length > 5000) {
      return NextResponse.json({ 
        error: "Player details must be 5000 characters or less" 
      }, { status: 400 });
    }
    
    if (trimmedContact.length > 120) {
      return NextResponse.json({ 
        error: "Contact must be 120 characters or less" 
      }, { status: 400 });
    }
    
    // Validate contact format (email or phone)
    if (!emailRegex.test(trimmedContact) && !phoneRegex.test(trimmedContact)) {
      return NextResponse.json({ 
        error: "Contact must be a valid email or phone number" 
      }, { status: 400 });
    }
    
    // Validate tournament_slug if provided
    let trimmedTournamentSlug = null;
    if (tournament_slug) {
      if (typeof tournament_slug !== 'string') {
        return NextResponse.json({ 
          error: "Tournament slug must be a string" 
        }, { status: 400 });
      }
      trimmedTournamentSlug = tournament_slug.trim();
      if (trimmedTournamentSlug.length > 140) {
        return NextResponse.json({ 
          error: "Tournament slug must be 140 characters or less" 
        }, { status: 400 });
      }
    }
    
    const now = new Date().toISOString();
    
    const newRegistration = await db.insert(teamRegistrations).values({
      teamName: trimmedTeamName,
      leaderName: trimmedLeaderName,
      playerDetails: trimmedPlayerDetails,
      contact: trimmedContact,
      tournamentSlug: trimmedTournamentSlug,
      willingToPay: true,
      createdAt: now,
      updatedAt: now,
    }).returning();
    
    return NextResponse.json(newRegistration[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

// GET handler - List registrations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tournamentSlug = searchParams.get('tournament_slug');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let query = db.select().from(teamRegistrations).orderBy(desc(teamRegistrations.createdAt));
    
    if (tournamentSlug) {
      query = query.where(eq(teamRegistrations.tournamentSlug, tournamentSlug));
    }
    
    const registrations = await query.limit(limit).offset(offset);
    return NextResponse.json(registrations);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}