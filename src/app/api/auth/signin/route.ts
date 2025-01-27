import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connect as connectMongoDB } from "@/lib/mongoose";
import { UsersModel } from "@/lib/mongoose/models";

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";





const expiresIn = 86400;



export async function POST (request: NextRequest) {
  const { email, password } = await request.json();

  try {
    await connectMongoDB();
    const user = await UsersModel.findOne({ email: email });

    if (!user) {
      return NextResponse.json({}, { status: 404 });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({}, { status: 401 });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_API_SECRET!, {
      expiresIn: expiresIn
    });

    const options = {
      maxAge: expiresIn,
      sameSite: true,
      httpOnly: true,
      secure: true,
    };
    (await cookies()).set("session", token, options);

    const response = {
      _id: user._id,
      email: user.email,
      name: user.name,
      dob: user.dob,
    };
    return NextResponse.json(response, { status: 200 });
  }
  catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}