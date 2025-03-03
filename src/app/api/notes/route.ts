import { NextRequest, NextResponse } from "next/server";

import { connect as connectMongoDB } from "@/lib/mongoose";
import { NotesModel } from "@/lib/mongoose/models";





export async function POST (request: NextRequest) {
  const note = await request.json();

  try {
    await connectMongoDB();
    const notes = await NotesModel.create(note);
    return NextResponse.json(notes, { status: 201 });
  }
  catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}