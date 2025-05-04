import { NextResponse, NextRequest } from 'next/server';
import connectMongo from '../../../lib/mongodb'; // adjust if needed
import Comment from '@/app/models/comments';

export async function POST(req: NextRequest, { params }: { params: { communityName: string } }) {
  try {
    const { communityName } = params;
    const body = await req.json();
    const { fullName, comment } = body;

    if (!communityName || !fullName || !comment) {
      return NextResponse.json(
        { error: 'Please fill all required fields, including community name.' },
        { status: 400 }
      );
    }

    await connectMongo();

    const newComment = new Comment({
      communityName,
      fullName,
      comment,
      createdAt: new Date(),
    });

    await newComment.save();

    return NextResponse.json(
      { message: 'Comment submitted successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error submitting comment:', error.message || error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, { params }: { params: { communityName: string } }) {
  try {
    await connectMongo();

    const comments = await Comment.find({ communityName: params.communityName }).sort({ createdAt: -1 });

    const formatted = comments.map((c: any) => ({
      username: c.fullName,
      text: c.comment,
      date: new Date(c.createdAt).toLocaleString(),
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error('Error fetching comments:', error.message || error);
    return NextResponse.json({ error: 'Failed to load comments' }, { status: 500 });
  }
}
