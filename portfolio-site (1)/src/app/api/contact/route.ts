import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.website ?? "");

  // Robots : on répond « OK » sans rien envoyer.
  if (honeypot) return NextResponse.json({ ok: true });

  if (name.length < 2 || name.length > 120 || !EMAIL_RE.test(email) || email.length > 200 || message.length < 10 || message.length > 5000) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Envoi serveur non configuré : le client bascule sur mailto.
    return NextResponse.json({ error: "Envoi par e-mail non configuré." }, { status: 501 });
  }

  const to = process.env.CONTACT_TO_EMAIL || "tedonkinguimtsa@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Nouveau message portfolio — ${name}`,
      html: `<p><strong>${esc(name)}</strong> (${esc(email)})</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
      text: `${name} (${email})\n\n${message}`,
    }),
  });
  if (!res.ok) return NextResponse.json({ error: "Échec de l’envoi." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
