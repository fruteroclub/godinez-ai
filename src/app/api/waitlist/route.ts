import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not configured");
}

const convex = new ConvexHttpClient(convexUrl);

interface WaitlistEntry {
  name: string;
  email: string;
  company?: string;
  tasks?: string;
  teamSize?: string;
  role?: string;
  source?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const entry: WaitlistEntry = {
      name: body.name || "",
      email: body.email || "",
      company: body.company || undefined,
      tasks: body.tasks || undefined,
      teamSize: body.teamSize || undefined,
      role: body.role || undefined,
      source: "landing",
    };

    if (!entry.name || !entry.email) {
      return NextResponse.json(
        { error: "Nombre y email son requeridos" },
        { status: 400 }
      );
    }

    const { api } = await import("../../../../convex/_generated/api");
    const result = await convex.mutation(api.waitlist.add, entry);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
