import { NextRequest, NextResponse } from "next/server";

import { connect as connectMongoDB } from "@/lib/mongoose";
import { UsersModel } from "@/lib/mongoose/models";

import * as bcrypt from "bcrypt";





export async function POST (request: NextRequest) {
  const user = await request.json();
  user.password = bcrypt.hashSync(user.password, 10);

  try {
    await connectMongoDB();
    const newUser = await UsersModel.create(user);
    return NextResponse.json(newUser, { status: 201 });
  }
  catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}