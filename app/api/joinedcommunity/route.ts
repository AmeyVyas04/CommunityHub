// app/api/getCommunity/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../lib/mongodb'; // Adjust the import path as necessary
import Community from '@/app/models/community'; // Ensure this path is correct

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const communityName = url.searchParams.get('communityName');

  if (!communityName) {
    return NextResponse.json({ error: 'Community name is required' }, { status: 400 });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Query the database for a community by its name
    const community = await Community.findOne({  communityName: communityName });

    if (!community) {
      return NextResponse.json({ error: 'Community not found' }, { status: 404 });
    }

    return NextResponse.json(community); // Return the community data
  } catch (error) {
    console.error('Error fetching community:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
