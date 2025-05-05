import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import Comment from '../../../models/comments';

type CommentType = {
  fullName: string;
  comment: string;
  createdAt: Date;
};

export async function POST(
  req: NextRequest,
  { params }: { params: { communityName: string } }
) {
  const { communityName } = params;
  const { fullName, comment }: { fullName: string; comment: string } = await req.json();

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
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { communityName: string } }
) {
  const { communityName } = params;

  await connectMongo();

  const comments = await Comment.find({ communityName }).sort({ createdAt: -1 });

  const formatted = (comments as CommentType[]).map((c) => ({
    username: c.fullName,
    text: c.comment,
    date: new Date(c.createdAt).toLocaleString(),
  }));

  return NextResponse.json(formatted, { status: 200 });
}
