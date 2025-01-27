import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";





export async function POST (request: NextRequest) {
  try {
    (await cookies()).delete("session");
    return NextResponse.json({}, { status: 200 });
  }
  catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}