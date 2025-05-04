import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../lib/mongodb';
import JoinRequest from '../../models/joincommunity';
import Community from '../../models/community';

export async function POST(req: NextRequest) {
  try {
    const { communityName, fullName, eligibility } = await req.json();

    if (!communityName || !fullName || !eligibility) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await connectMongo();

    // Check if the community exists
    const community = await Community.findOne({ communityName });
    if (!community) {
      return NextResponse.json({ error: 'Community does not exist' }, { status: 404 });
    }

    // Check if the user has already joined the community
    const existingRequest = await JoinRequest.findOne({ communityName, fullName });

    if (existingRequest) {
      // Redirect to the community page (client handles redirect on success status)
      return NextResponse.json(
        { message: 'Already a member', redirect: `/community/${communityName}` },
        { status: 200 }
      );
    }

    // Create a new join request
    const newRequest = new JoinRequest({ communityName, fullName, eligibility });
    await newRequest.save();

    return NextResponse.json({ message: 'Join request submitted successfully' });
  } catch (err) {
    console.error('Error submitting join request:', err);
    return NextResponse.json({ error: 'Failed to submit join request' }, { status: 500 });
  }
}
