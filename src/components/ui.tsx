import { useEffect, useRef, useState, type ReactNode } from 'react'

export function Arrow() {
  return <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" /></svg>
}

export function Check() {
  return <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m4 10 4 4 8-9" /></svg>
}

export function Logo() {
  return (
    <img
      src="/images/Logo_Horizontal.png"
      alt="PRIMITIVOS - SPA DE UÑAS PARA HOMBRE"
      className="block h-auto w-32 max-h-10 object-contain sm:w-36"
    />
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-[10px] font-extrabold tracking-[.2em] text-bronce sm:text-xs">{children}</p>
}

export function SectionTitle({ kicker, children }: { kicker: string; children: ReactNode }) {
  return <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
    <div><Kicker>{kicker}</Kicker><h2 className="font-display text-5xl leading-[.98] sm:text-6xl lg:text-7xl">{children}</h2></div>
  </div>
}

export function Cta({
  children,
  href = '#reservar',
  pulse = false,
  className = ''
}: {
  children: ReactNode;
  href?: string;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      data-conversion="booking-cta"
      className={`inline-flex w-fit min-h-10 items-center justify-center gap-2
        bg-bronce px-4 py-2 text-center text-[9px] sm:text-[10px]
        font-black tracking-[.10em] text-black transition
        hover:bg-hueso
        ${pulse ? 'animate-pulse-gold' : ''}
        ${className}`}
    >
      {children}
      <Arrow />
    </a>
  );
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = element.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.08 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={element} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>
}
