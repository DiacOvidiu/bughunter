import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();

  if (!email || !email.includes("@") || email.length > 320) {
    return NextResponse.redirect(new URL("/?abonare=invalid", request.url), 303);
  }

  return NextResponse.redirect(new URL("/?abonare=ok", request.url), 303);
}
