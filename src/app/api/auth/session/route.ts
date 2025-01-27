import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import * as jwt from "jsonwebtoken";





export async function POST (request: NextRequest) {
  const token = (await headers()).get("x-access-token");





  if (!token) {
    return NextResponse.json({}, { status: 403 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_API_SECRET!) as jwt.JwtPayload;
    return NextResponse.json({}, { status: 200 });
  }
  catch (error) {
    return NextResponse.json(error, { status: 401 });
  }
}