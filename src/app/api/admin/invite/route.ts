import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { Resend } from "resend";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) throw new Error("NEXT_PUBLIC_CONVEX_URL is not configured");

const convex = new ConvexHttpClient(convexUrl);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const STUDIO_API_URL = process.env.STUDIO_API_URL;
const STUDIO_SERVICE_KEY = process.env.STUDIO_SERVICE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const STUDIO_URL = process.env.NEXT_PUBLIC_STUDIO_URL || "https://dev-studio.godinez.ai";

export async function POST(request: NextRequest) {
  // Verify admin password
  const adminPassword = request.headers.get("X-Admin-Password");
  if (!ADMIN_PASSWORD || adminPassword !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (!STUDIO_API_URL || !STUDIO_SERVICE_KEY) {
    return NextResponse.json(
      { error: "Studio API not configured" },
      { status: 503 },
    );
  }

  try {
    const { waitlistId, email, name, source } = await request.json();

    if (!waitlistId || !email) {
      return NextResponse.json(
        { error: "waitlistId y email son requeridos" },
        { status: 400 },
      );
    }

    // 1. Generate referral code via studio API
    const codeRes = await fetch(`${STUDIO_API_URL}/api/referral-codes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Service-Key": STUDIO_SERVICE_KEY,
      },
      body: JSON.stringify({ email, name, source }),
    });

    if (!codeRes.ok) {
      const err = await codeRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.error || "Error al generar código" },
        { status: 502 },
      );
    }

    const { code, expiresAt } = await codeRes.json();

    // 2. Send invitation email via Resend
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      const signupUrl = `${STUDIO_URL}/sign-up?code=${code}`;
      const expiryDate = new Date(expiresAt).toLocaleDateString("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      await resend.emails.send({
        from: "Godínez.AI <invitaciones@godinez.ai>",
        to: email,
        subject: "Tu invitación a Godínez Studio - Beta",
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:480px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#FFFFFF;font-size:24px;margin:0;">Godínez<span style="color:#E91E8C">.AI</span></h1>
    </div>
    <div style="background:#1A1A1A;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px;">
      <p style="color:#FFFFFF;font-size:16px;margin:0 0 8px;">Hola${name ? ` ${name}` : ""},</p>
      <p style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.6;margin:0 0 24px;">
        Fuiste seleccionado para probar <strong style="color:#FFFFFF;">Godínez Studio</strong> en beta privada.
        Usa el siguiente código para crear tu cuenta:
      </p>
      <div style="background:rgba(233,30,140,0.1);border:1px solid rgba(233,30,140,0.3);border-radius:12px;padding:16px;text-align:center;margin-bottom:24px;">
        <span style="color:#E91E8C;font-size:24px;font-weight:bold;letter-spacing:4px;font-family:monospace;">${code}</span>
      </div>
      <div style="text-align:center;margin-bottom:24px;">
        <a href="${signupUrl}" style="display:inline-block;background:#E91E8C;color:#FFFFFF;text-decoration:none;font-weight:600;font-size:14px;padding:12px 32px;border-radius:99px;">
          Crear mi cuenta
        </a>
      </div>
      <p style="color:rgba(255,255,255,0.4);font-size:12px;text-align:center;margin:0;">
        Este código es de un solo uso y expira el ${expiryDate}.
      </p>
    </div>
    <p style="color:rgba(255,255,255,0.3);font-size:11px;text-align:center;margin-top:24px;">
      © ${new Date().getFullYear()} Godínez.AI — Empleados IA para PYMEs
    </p>
  </div>
</body>
</html>`,
      });
    }

    // 3. Update Convex waitlist status
    const { api } = await import("../../../../../convex/_generated/api");
    await convex.mutation(api.waitlist.markInvited, {
      id: waitlistId,
      referralCode: code,
    });

    return NextResponse.json({ success: true, code });
  } catch (error) {
    console.error("Invite error:", error);
    return NextResponse.json(
      { error: "Error al enviar invitación" },
      { status: 500 },
    );
  }
}
