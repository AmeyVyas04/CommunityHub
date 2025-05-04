import { NextResponse, NextRequest } from 'next/server';
import connectMongo from '../../../lib/mongodb'; // Adjust the path if needed
import Comment, { IComment } from '@/app/models/comments';

// Handle POST requests (submit a new comment)
export async function POST(req: NextRequest, context: { params: { communityName: string } }) {
  try {
    const { communityName } = context.params;
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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error submitting comment:', errorMessage);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function GET(_req: NextRequest, context: { params: { communityName: string } }) {
  try {
    const { communityName } = context.params;
    await connectMongo();

    const comments: IComment[] = await Comment.find({ communityName }).sort({ createdAt: -1 });

    const formatted = comments.map((c) => ({
      username: c.fullName,
      text: c.comment,
      date: new Date(c.createdAt).toLocaleString(),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching comments:', errorMessage);
    return NextResponse.json({ error: 'Failed to load comments' }, { status: 500 });
  }
}
