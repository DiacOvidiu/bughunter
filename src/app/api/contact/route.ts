import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const RECIPIENTS = [
  "antreprenor@danpopescu.ro",
  "diacovidiu15@gmail.com",
];

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

  if (!valid) {
    return NextResponse.redirect(new URL("/?trimis=invalid", request.url), 303);
  }

  try {
    await transporter.sendMail({
      from: `"BugHunter Contact" <${process.env.SMTP_USER}>`,
      to: RECIPIENTS.join(", "),
      replyTo: email,
      subject: `[BugHunter] ${topic}`,
      text: `Nume: ${name}\nEmail: ${email}\nSubiect: ${topic}\n\n${message}`,
      html: `
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subiect:</strong> ${topic}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });
  } catch {
    return NextResponse.redirect(new URL("/?trimis=invalid", request.url), 303);
  }

  return NextResponse.redirect(new URL("/?trimis=ok", request.url), 303);
}
