import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not configured");
}

const convex = new ConvexHttpClient(convexUrl);

const VALID_TIERS = ["becario", "asistente", "agente"] as const;
const VALID_INDUSTRIES = [
  "finanzas", "salud", "ventas", "founder", "estudiante",
  "remoto", "freelancer", "creativo", "desarrollador", "administracion",
] as const;

type Tier = (typeof VALID_TIERS)[number];
type Industry = (typeof VALID_INDUSTRIES)[number];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name: string = body.name || "";
    const email: string = body.email || "";
    const tier = VALID_TIERS.includes(body.tier) ? (body.tier as Tier) : "becario";
    const industry = VALID_INDUSTRIES.includes(body.industry) ? (body.industry as Industry) : "remoto";

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nombre y email son requeridos" },
        { status: 400 }
      );
    }

    const { api } = await import("../../../../convex/_generated/api");
    const result = await convex.mutation(api.waitlist.add, {
      name,
      email,
      company: body.company || undefined,
      tasks: body.tasks || undefined,
      teamSize: body.teamSize || undefined,
      tier,
      industry,
      source: "landing",
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
