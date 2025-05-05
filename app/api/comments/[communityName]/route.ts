import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import Comment, { IComment } from '../../../models/comments';

export async function POST(req: NextRequest, context: any) {
  const { communityName } = context.params as { communityName: string };
  const { fullName, comment }: { fullName: string; comment: string } = await req.json();

  if (!communityName || !fullName || !comment) {
    return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 });
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
}

export async function GET(_req: NextRequest, context: any) {
  const { communityName } = context.params as { communityName: string };

  await connectMongo();
  const comments: IComment[] = await Comment.find({ communityName }).sort({ createdAt: -1 });

  const formatted = comments.map((c) => ({
    username: c.fullName,
    text: c.comment,
    date: new Date(c.createdAt).toLocaleString(),
  }));

  return NextResponse.json(formatted, { status: 200 });
}
