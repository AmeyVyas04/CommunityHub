
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import Comment from '../../../models/comments';

// POST: Submit a new comment
export async function POST(req: NextRequest, { params }: { params: { communityName: string } }) {
  try {
    const { communityName } = await params; // Await the params object here
    const { fullName, comment } = await req.json();

    // Validation for required fields
    if (!communityName || !fullName || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Establish MongoDB connection
    await connectMongo();

    // Create a new comment in the database
    const newComment = new Comment({
      communityName,
      fullName,
      comment,
      createdAt: new Date(), // Store the creation date
    });

    // Save the comment and return the response
    await newComment.save();
    return NextResponse.json({ message: 'Comment submitted' }, { status: 201 });
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    console.error('Error:', error.message || error);
  }
  
}

// GET: Fetch comments
export async function GET(_req: NextRequest, { params }: { params: { communityName: string } }) {
  try {
    const { communityName } = await params; // Await the params object here

    // Validate the communityName
    if (!communityName) {
      return NextResponse.json({ error: 'Community name is required' }, { status: 400 });
    }

    // Establish MongoDB connection
    await connectMongo();

    // Fetch comments for the given communityName and sort by creation date
    const comments = await Comment.find({ communityName })
      .sort({ createdAt: -1 }) // Sort in descending order of createdAt
      .select('fullName comment createdAt') // Select only necessary fields

    // Format comments to match frontend expectations
    const formattedComments = comments.map((c) => ({
      username: c.fullName,
      text: c.comment,
      date: new Date(c.createdAt).toLocaleString(), // Format date for frontend
    }));

    return NextResponse.json(formattedComments, { status: 200 });
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('Error:', err.message || err);
  }
  
}
