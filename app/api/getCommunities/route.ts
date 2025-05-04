// app/api/getCommunities/route.ts

import { NextResponse } from 'next/server';
import connectMongo from '../../lib/mongodb';
import Community from '@/app/models/community';

export async function GET() {
  try {
    await connectMongo();
    const communities = await Community.find(); // Fetch all communities from MongoDB
    return NextResponse.json(communities);
  } catch (error) {
    console.error('Error fetching communities:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
