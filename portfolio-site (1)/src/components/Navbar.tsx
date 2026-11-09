"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b transition-colors ${scrolled || open ? "border-line bg-bg/95 backdrop-blur" : "border-transparent"}`}>
      <nav aria-label="Navigation principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-10">
        <a href="#top" className="text-sm font-semibold tracking-tight" onClick={() => setOpen(false)}>
          Tedonki Nguimtsa
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {NAV.filter((n) => n.id !== "contact").map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className={`text-sm transition-colors hover:text-ink ${active === n.id ? "text-ink" : "text-mute"}`}
              >
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
              Discuter d’un projet
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="-mr-2 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg px-5 pb-6 pt-2 md:hidden">
          <ul>
            {NAV.map((n) => (
              <li key={n.id} className="border-b border-line/60 last:border-0">
                <a href={`#${n.id}`} onClick={() => setOpen(false)} className="block py-3.5 text-lg">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${SITE.email}`} className="mt-4 block text-sm text-mute">{SITE.email}</a>
        </div>
      )}
    </header>
  );
}
