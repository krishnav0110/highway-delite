import { NextResponse } from "next/server";
import { cookies } from "next/headers";





export async function POST () {
  try {
    (await cookies()).delete("session");
    return NextResponse.json({}, { status: 200 });
  }
  catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}