import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import Comment from '../../../models/comments';

// Define expected comment document shape
interface CommentDoc {
  fullName: string;
  comment: string;
  createdAt: Date;
}

// POST: Add a new comment
export async function POST(
  request: NextRequest,
  context: { params: Record<string, string> }
) {
  try {
    const { communityName } = context.params;
    const body = await request.json();
    const { fullName, comment }: { fullName: string; comment: string } = body;

    if (!communityName || !fullName || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectMongo();

    await Comment.create({
      communityName,
      fullName,
      comment,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Comment submitted' }, { status: 201 });
  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// GET: Fetch comments for a community
export async function GET(
  _request: NextRequest,
  context: { params: Record<string, string> }
) {
  try {
    const { communityName } = context.params;

    if (!communityName) {
      return NextResponse.json({ error: 'Community name is required' }, { status: 400 });
    }

    await connectMongo();

    const comments = await Comment.find({ communityName }).sort({ createdAt: -1 });

    const formatted = comments.map((c: CommentDoc) => ({
      username: c.fullName,
      text: c.comment,
      date: new Date(c.createdAt).toLocaleString(),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error('GET error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
