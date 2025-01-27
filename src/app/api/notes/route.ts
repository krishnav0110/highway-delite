import { NextRequest, NextResponse } from "next/server";

import { connect as connectMongoDB } from "@/lib/mongoose";
import { NotesModel } from "@/lib/mongoose/models";





export async function GET (request: NextRequest, response: NextResponse) {
  try {
    await connectMongoDB();
    const notes = await NotesModel.find({});
    console.log(notes);
  }
  catch (error) {
    console.error(error);
  }
  return NextResponse.json({}, { status: 200 });
}