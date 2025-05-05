import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import Comment from '../../../models/comments';

// This is the correct type for the second argument for App Router API routes in Next.js
type RouteContext = {
  params: {
    communityName: string;
  };
};

// POST handler
export async function POST(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { communityName } = params;
    const { fullName, comment } = await req.json();

    if (!communityName || !fullName || !comment) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await connectMongo();

    await Comment.create({
      communityName,
      fullName,
      comment,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Comment submitted' }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET handler
export async function GET(
  _req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { communityName } = params;

    await connectMongo();

    const comments = await Comment.find({ communityName }).sort({ createdAt: -1 });

    const formatted = comments.map((c: any) => ({
      username: c.fullName,
      text: c.comment,
      date: new Date(c.createdAt).toLocaleString(),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
