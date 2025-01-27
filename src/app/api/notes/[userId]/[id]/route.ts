import { NextRequest, NextResponse } from "next/server";

import { connect as connectMongoDB } from "@/lib/mongoose";
import { NotesModel } from "@/lib/mongoose/models";





export async function DELETE (request: NextRequest, { params }: { params: Promise<{ userId: string, id: string }> }) {
  const { userId, id } = await params;

  try {
    await connectMongoDB();
    await NotesModel.findOneAndDelete({ _id: id, userId: userId });
    return NextResponse.json({}, { status: 200 });
  }
  catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}