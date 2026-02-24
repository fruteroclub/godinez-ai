import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const burritoUrl = process.env.BURRITO_API_URL;

  if (!burritoUrl) {
    return NextResponse.json(
      { error: "Agent API not configured" },
      { status: 503 }
    );
  }

  const response = await fetch(`${burritoUrl}/api/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BURRITO_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
