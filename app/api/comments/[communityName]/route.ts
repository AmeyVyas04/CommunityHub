import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import Comment, { IComment } from '../../../models/comments';

interface RouteParams {
  params: {
    communityName: string;
  };
}

// POST: Add a comment
export async function POST(req: NextRequest, { params }: RouteParams) {
  try {
    const { communityName } = params;
    const { fullName, comment }: { fullName: string; comment: string } = await req.json();

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

    return NextResponse.json({ message: 'Comment submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error submitting comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET: Fetch comments for a community
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const { communityName } = params;

    await connectMongo();

    const comments: IComment[] = await Comment.find({ communityName }).sort({ createdAt: -1 });

    const formatted = comments.map((c) => ({
      username: c.fullName,
      text: c.comment,
      date: new Date(c.createdAt).toLocaleString(),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to load comments' }, { status: 500 });
  }
}
