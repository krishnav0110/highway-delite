import { NextRequest, NextResponse } from "next/server";

import { connect as connectMongoDB } from "@/lib/mongoose";
import { NotesModel } from "@/lib/mongoose/models";





export async function GET (request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  try {
    await connectMongoDB();
    const notes = await NotesModel.find({ userId: userId });
    return NextResponse.json(notes, { status: 200 });
  }
  catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}