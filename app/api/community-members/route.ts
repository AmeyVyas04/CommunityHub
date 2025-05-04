import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../lib/mongodb'; // adjust if needed
import JoinRequest from '../../models/joincommunity';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const communityName = url.searchParams.get('communityName');

    if (!communityName) {
      return NextResponse.json({ error: 'Missing community name' }, { status: 400 });
    }

    await connectMongo();

    const members = await JoinRequest.find({ communityName, eligibility: 'yes' }).select('fullName');

    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}
