import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import Comment from '../../../models/comments';

// POST: Submit a new comment
export async function POST(request: NextRequest, context: { params: { communityName: string } }) {
  try {
    const communityName = context.params.communityName;
    const { fullName, comment } = await request.json();

    if (!communityName || !fullName || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectMongo();

    const newComment = new Comment({
      communityName,
      fullName,
      comment,
      createdAt: new Date(),
    });

    await newComment.save();
    return NextResponse.json({ message: 'Comment submitted' }, { status: 201 });
  } catch (error) {
    const err = error as { message?: string };
    console.error('POST error:', err.message || err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET: Fetch comments
export async function GET(request: NextRequest, context: { params: { communityName: string } }) {
  try {
    const communityName = context.params.communityName;

    if (!communityName) {
      return NextResponse.json({ error: 'Community name is required' }, { status: 400 });
    }

    await connectMongo();

    const comments = await Comment.find({ communityName })
      .sort({ createdAt: -1 })
      .select('fullName comment createdAt');

    const formattedComments = comments.map((c) => ({
      username: c.fullName,
      text: c.comment,
      date: new Date(c.createdAt).toLocaleString(),
    }));

    return NextResponse.json(formattedComments, { status: 200 });
  } catch (error) {
    const err = error as { message?: string };
    console.error('GET error:', err.message || err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
