import { useState } from 'react'
import { OFFER, WHATSAPP_URL } from '../data/content'
import { Arrow, Cta, Kicker, Logo } from './ui'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [{ href: '#servicios', label: 'SERVICIOS' }, { href: '#por-que', label: 'POR QUÉ PRIMITIVOS' }, { href: '#faq', label: 'PREGUNTAS' }]
  return <>
    <a href="#reservar" className="fixed inset-x-0 top-0 z-[70] flex min-h-9 items-center justify-center gap-2 bg-bronce px-3 py-2 text-center text-[9px] font-black tracking-wider text-black sm:text-[10px]"><strong>{OFFER}</strong><span className="hidden sm:inline">· CUPOS LIMITADOS ESTA SEMANA</span><b className="inline-flex items-center gap-1">RESERVAR <Arrow /></b></a>
    <header className="fixed inset-x-0 top-9 z-[60] flex h-16 items-center justify-between border-b border-bronce/25 bg-black/90 px-4 backdrop-blur-xl sm:px-8">
      <a href="#inicio" aria-label="Primitivos, inicio"><Logo /></a>
      <nav aria-label="Navegación principal" className={`${menuOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-16 flex-col gap-6 border-b border-bronce/25 bg-[#050403] p-6 text-[10px] font-extrabold tracking-widest md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`}>{links.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="transition hover:text-bronce">{link.label}</a>)}</nav>
      <div className="flex items-center gap-3"><Cta className="hidden min-h-10 px-4 py-2 md:inline-flex">RESERVAR AHORA</Cta><button type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)} className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"><span className={`h-px w-6 bg-bronce transition ${menuOpen ? 'translate-y-[4px] rotate-45' : ''}`} /><span className={`h-px w-6 bg-bronce transition ${menuOpen ? '-translate-y-[3px] -rotate-45' : ''}`} /></button></div>
    </header>
  </>
}

export function Footer() {
  return <footer className="grid gap-9 border-t border-bronce/20 bg-[#030302] px-5 py-16 pb-28 sm:grid-cols-2 sm:px-10 lg:grid-cols-5 lg:px-[9vw]">
    <div><Logo /><p className="mt-5 text-[10px] font-extrabold tracking-widest text-bronce">PRIMITIVOS. CUIDARSE ES PODER.</p></div>
    <div><h3 className="mb-3 text-[10px] font-extrabold tracking-widest text-bronce">DIRECCIÓN</h3><p className="text-xs leading-6 text-hueso/60">Calle 78 # 44-28, Medellín, Antioquia<br />Valle de Aburrá</p></div>
    <div>
      <h3 className="mb-3 text-[10px] font-extrabold tracking-widest text-bronce">
        HORARIOS
      </h3>
      <p className="text-xs text-hueso/60">
        Lunes a sábado<br />
        11:00 a. m. a 7:00 p. m.
      </p>
    </div>
    <div>
      <h3 className="mb-3 text-[10px] font-extrabold tracking-widest text-bronce">
        CONTACTO
      </h3>

      <a
        href="https://www.instagram.com/primitivos_formen?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="
        target="_blank"
        rel="noopener noreferrer"
        className="block text-xs text-hueso/60"
      >
        Instagram
      </a>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block text-xs text-hueso/60"
      >
        WhatsApp
      </a>
    </div>
    <div className="overflow-hidden rounded-sm border border-bronce/25">
      <iframe
        src="https://maps.google.com/maps?q=6.2710553,-75.5537608&z=17&output=embed"
        width="100%"
        height="180"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de Primitivos - Medellín"
        className="block h-[180px] w-full border-0 brightness-[1.2] contrast-[1] invert-[1.5] sepia-[0.6] hue-rotate-[340deg] saturate-[0.5]"
      />
    </div>
  </footer>
}

export function FloatingActions({ visible }: { visible: boolean }) {
  return (
    <>
      {/* Botón flotante de WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Reservar por WhatsApp"
        className="fixed bottom-20 right-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-black bg-bronce shadow-xl transition hover:scale-105"
      >
        <img
          src="/images/logo_whatsapp.svg"
          alt="WhatsApp"
          className="h-10 w-10 object-cover"
        />
      </a>

      {/* Barra inferior de reserva */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-between gap-3 border-t border-bronce bg-black/95 px-4 transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <span className="text-[9px] font-bold tracking-wider text-arena">
          {OFFER}
        </span>

        <a
          href="#reservar"
          className="inline-flex items-center gap-2 bg-bronce px-4 py-3 text-[10px] font-black tracking-wider text-black"
        >
          RESERVAR <Arrow />
        </a>
      </div>
    </>
  );
}

export function ExitModal({ onClose }: { onClose: () => void }) {
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="exit-title"><div className="relative w-full max-w-xl border border-bronce bg-[linear-gradient(145deg,#251d13,#050403)] p-8 text-center shadow-2xl sm:p-12"><button type="button" aria-label="Cerrar oferta" onClick={onClose} className="absolute right-4 top-2 text-3xl text-arena">×</button><Kicker>ANTES DE IRTE</Kicker><h2 id="exit-title" className="font-display text-5xl leading-none sm:text-6xl">ESPERA. TU PRIMERA CITA TIENE <span className="text-bronce">[XX]% OFF.</span></h2><p className="my-6 text-sm text-hueso/65">Reserva hoy. Confirma por WhatsApp.</p><Cta href="#reservar" className="w-full" >QUIERO MI DESCUENTO</Cta><small className="mt-5 block text-[9px] tracking-wider text-arena">OFERTA VÁLIDA HASTA [FECHA REAL]</small></div></div>
}
