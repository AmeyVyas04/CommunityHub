// app/api/create-community/route.ts

import { NextResponse } from 'next/server';
import connectMongo from '../../lib/mongodb';
import Community from '@/app/models/community'; // You'll need to define this model
import { Types } from 'mongoose';

export async function POST(req: Request) {
  try {
    const {
      fullName,
      email,
      phone,
      communityName,
      category,
      description,
      eligibility,
      rules,
      privacy,
      tags,
    } = await req.json();

    // ✅ Basic validation
    if (
      !fullName || !email ||  !communityName ||
      !category || !description || !eligibility || !rules || !privacy
    ) {
      return NextResponse.json(
        { error: 'Please fill all required fields' },
        { status: 400 }
      );
    }

    await connectMongo();

    // ✅ Check for duplicate community
    const existing = await Community.findOne({ communityName });
    if (existing) {
      return NextResponse.json(
        { error: 'Community name already taken' },
        { status: 400 }
      );
    }

    // ✅ Save new community
    const newCommunity = new Community({
      fullName,
      email,
      phone,
      communityName,
      category,
      description,
      eligibility,
      rules,
      privacy,
      tags,
      createdAt: new Date(),
    });

    await newCommunity.save();

    return NextResponse.json(
      { message: 'Community created successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating community:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
