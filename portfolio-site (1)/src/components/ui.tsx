import Image from "next/image";
import type { ReactNode } from "react";

export function Section({ id, title, children, className = "", wide = false }: {
  id: string; title: ReactNode; children: ReactNode; className?: string; wide?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative px-5 py-20 md:px-10 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <h2
          id={`${id}-title`}
          className={`text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl ${wide ? "max-w-4xl" : "max-w-3xl"}`}
        >
          {title}
        </h2>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}

export function Logo({ name, size = 48, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    <Image
      src={`/images/logos/${name}.jpg`}
      alt=""
      width={size * 2}
      height={size * 2}
      sizes={`${size}px`}
      className={`shrink-0 rounded-xl object-cover ring-1 ring-white/10 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
