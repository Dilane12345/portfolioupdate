"use client";
import { useState } from "react";
import { Mail, MessageCircle, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { Section } from "./ui";
import { SITE, whatsappLink } from "@/lib/site";

type Values = { name: string; email: string; message: string; website: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Indiquez votre nom (2 caractères minimum).";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Indiquez une adresse e-mail valide, par exemple nom@entreprise.com.";
  if (v.message.trim().length < 10) e.message = "Décrivez votre projet en 10 caractères minimum.";
  return e;
}

export default function Contact() {
  const [v, setV] = useState<Values>({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback" | "error">("idle");

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k as keyof Errors]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate(v);
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`field-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      if (res.ok) { setStatus("sent"); return; }
      if (res.status === 501) {
        // Envoi serveur non configuré : on prépare le message dans la messagerie de l’utilisateur.
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Projet publicitaire — " + v.name)}&body=${encodeURIComponent(v.message + "\n\n" + v.name + " — " + v.email)}`;
        setStatus("fallback");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const inputCls = (bad?: string) =>
    `mt-2 w-full rounded-xl border bg-bg px-4 py-3.5 text-base outline-none transition-colors placeholder:text-mute/60 focus:border-accent ${bad ? "border-red-400" : "border-line"}`;

  return (
    <Section id="contact" title="LET’S TALK ABOUT YOUR NEXT CAMPAIGN." wide>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <div>
          <p className="text-xl font-semibold">Tedonki Nguimtsa</p>
          <p className="mt-1 text-mute">Media Buyer &amp; Digital Acquisition Strategist</p>
          <ul className="mt-10 space-y-5">
            <li>
              <a href={`mailto:${SITE.email}`} className="group flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line group-hover:border-accent-soft"><Mail size={18} aria-hidden /></span>
                <span><span className="block text-sm text-mute">E-mail</span><span className="break-all">{SITE.email}</span></span>
              </a>
            </li>
            <li>
              <a href={`tel:+${SITE.whatsapp}`} className="group flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line group-hover:border-accent-soft"><Phone size={18} aria-hidden /></span>
                <span><span className="block text-sm text-mute">Téléphone</span><span>{SITE.phoneDisplay}</span></span>
              </a>
            </li>
          </ul>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-[#06210f] transition-opacity hover:opacity-90"
          >
            <MessageCircle size={20} aria-hidden /> Écrire sur WhatsApp
          </a>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">
          {status === "sent" || status === "fallback" ? (
            <div role="status" className="flex flex-col items-start gap-4 py-8">
              <CheckCircle2 size={36} className="text-accent-soft" aria-hidden />
              <p className="text-2xl font-semibold tracking-tight">
                {status === "sent" ? "Message envoyé." : "Votre message est prêt dans votre messagerie."}
              </p>
              <p className="text-mute">
                {status === "sent"
                  ? `Merci ${v.name.trim().split(" ")[0]}. Je reviens vers vous à l’adresse ${v.email.trim()} dès que possible.`
                  : "Envoyez-le depuis votre application e-mail pour que je le reçoive. Vous pouvez aussi m’écrire directement sur WhatsApp."}
              </p>
              <button type="button" onClick={() => { setStatus("idle"); setV({ name: "", email: "", message: "", website: "" }); }} className="text-sm underline underline-offset-4">
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="field-name" className="text-sm font-medium">Nom</label>
                <input id="field-name" name="name" autoComplete="name" value={v.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} className={inputCls(errors.name)} placeholder="Votre nom" />
                {errors.name && <p id="err-name" className="mt-1.5 text-sm text-red-300">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="field-email" className="text-sm font-medium">E-mail</label>
                <input id="field-email" name="email" type="email" autoComplete="email" inputMode="email" value={v.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} className={inputCls(errors.email)} placeholder="nom@entreprise.com" />
                {errors.email && <p id="err-email" className="mt-1.5 text-sm text-red-300">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="field-message" className="text-sm font-medium">Votre projet</label>
                <textarea id="field-message" name="message" rows={5} value={v.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} className={inputCls(errors.message)} placeholder="Votre activité, votre objectif, votre budget approximatif…" />
                {errors.message && <p id="err-message" className="mt-1.5 text-sm text-red-300">{errors.message}</p>}
              </div>
              {/* champ piège anti-spam : invisible pour les humains */}
              <div className="absolute -left-[9999px]" aria-hidden>
                <label>Ne pas remplir<input tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} /></label>
              </div>
              {status === "error" && (
                <p role="alert" className="text-sm text-red-300">
                  L’envoi a échoué. Réessayez, ou écrivez-moi directement à {SITE.email} ou sur WhatsApp.
                </p>
              )}
              <button type="submit" disabled={status === "sending"} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto">
                {status === "sending" ? (<><Loader2 size={18} className="animate-spin" aria-hidden /> Envoi en cours</>) : "Envoyer le message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
