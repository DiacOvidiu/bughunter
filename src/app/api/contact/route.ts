import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const topic = String(formData.get("topic") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const valid =
    name.length >= 2 &&
    name.length <= 80 &&
    email.includes("@") &&
    email.length <= 320 &&
    topic.length >= 3 &&
    topic.length <= 120 &&
    message.length >= 10 &&
    message.length <= 4000;

  return NextResponse.redirect(new URL(`/contact?trimis=${valid ? "ok" : "invalid"}`, request.url), 303);
}
