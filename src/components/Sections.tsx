import { useState, type FormEvent } from 'react'
import { benefits, faqs, OFFER, services, WHATSAPP_NUMBER, WHATSAPP_URL } from '../data/content'
import { Arrow, Check, Cta, Kicker, Reveal, SectionTitle } from './ui'


export function Hero() {
  return <section id="inicio" className="relative flex min-h-[720px] items-center overflow-hidden bg-[radial-gradient(ellipse_at_75%_55%,#302315_0%,#100c08_38%,#000_72%)] px-5 pb-20 pt-36 sm:px-10 lg:min-h-[780px] lg:px-[9vw]">
    <div className="relative z-10 max-w-2xl">
      <Kicker>EL ÚNICO SPA DE UÑAS HECHO PARA HOMBRES</Kicker>
      <h1 className="font-display text-[clamp(4rem,11vw,8.8rem)] leading-[.88]">TUS MANOS<br />HABLAN DE TI.<br /><span className="text-bronce">¿QUÉ DICEN?</span></h1>
      <p className="mt-7 max-w-lg text-sm leading-7 text-hueso/70 sm:text-base">Manicura y pedicura solo para hombres en Medellín. Atención privada, rápida y sin juicios.</p>
      <div className="mt-7 inline-flex flex-col border border-bronce px-5 py-3">
        <span className="text-[9px] font-bold tracking-[.15em] text-arena">OFERTA DE LANZAMIENTO</span>
        <strong className="text-sm text-bronce">PRIMERA CITA CON 15% OFF</strong>
      </div>
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Cta pulse>RESERVAR MI CITA</Cta>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-wider text-bronce">RESERVAR POR WHATSAPP <Arrow /></a>
      </div>
      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-[9px] font-bold tracking-wider text-arena">
        {['SOLO HOMBRES', 'ATENCIÓN PRIVADA'].map(item => <span key={item} className="inline-flex items-center gap-1"><Check />{item}</span>)}
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-3 text-[9px] font-bold tracking-wider"><strong className="text-lg tracking-widest text-bronce">★★★★★</strong><span>LOS HOMBRES YA SE CUIDAN AQUÍ</span></div>
    </div>
    <img src="/images/Isotipo_blanco.svg" alt="Gato esfinge de Primitivos con traje negro" width="1080" height="993" fetchPriority="high" className="pointer-events-none absolute bottom-0 right-[-9rem] hidden h-[78%] max-h-[700px] w-auto object-contain opacity-90 lg:block xl:right-[5%]" />
  </section>
}

export function PainSection() {
  const painPoints = ['Todo es rosa, flores y música que no es tuya.', 'Sientes pena. Parece que invades un espacio ajeno.', 'Terminas sin cuidarte. O lo haces a escondidas.']
  return <section className="bg-[#0a0806] px-5 py-12 sm:px-5 lg:px-[9vw]">
    <Reveal><Kicker>HABLEMOS CLARO</Kicker><h2 className="font-display text-5xl leading-none sm:text-7xl">¿POR QUÉ NO<br /><span className="text-bronce">HABÍAS IDO?</span></h2></Reveal>
    <div className="mt-12 grid gap-px bg-bronce/20 md:grid-cols-3">{painPoints.map((point, index) => <Reveal key={point} className="min-h-48 bg-[#0a0806] p-7"><b className="text-xs text-bronce">0{index + 1}</b><p className="mt-8 max-w-xs text-lg">{point}</p></Reveal>)}</div>
    <Reveal className="mt-14 text-center"><h3 className="font-display text-3xl sm:text-4xl">PRIMITIVOS CAMBIA ESO.</h3><p className="my-3 text-sm text-hueso/65">Cuidarte es fuerza. No una excepción incómoda.</p><Cta>QUIERO MI CITA</Cta></Reveal>
  </section>
}

export function ServicesSection() {
  return (
    <section id="servicios" className="bg-black px-5 py-12 sm:px-5 lg:px-[9vw]">
      <SectionTitle kicker="PRECIOS CLAROS. CERO SORPRESAS.">
        ELIGE. RESERVA.<br />
        <span className="text-bronce">LLEGA.</span>
      </SectionTitle>

      <p className="-mt-5 mb-9 text-sm text-hueso/60">
        Entras, te cuidamos y sales. Así de simple.
      </p>

      <div className="grid gap-4 lg:grid-cols-3">
        {services.map(service => (
          <Reveal
            key={service.name}
            className={`relative flex flex-col border p-7 ${service.featured
              ? 'border-bronce bg-[#211910]'
              : 'border-bronce/25 bg-[#0b0907]'
              }`}
          >
            {service.featured && (
              <span className="absolute -top-3 left-6 bg-bronce px-3 py-1 text-[8px] font-black tracking-wider text-black">
                MÁS PEDIDO · {OFFER}
              </span>
            )}

            {/* Imagen del servicio */}
            <div className="mb-5 aspect-[4/3] w-full overflow-hidden">
              <img
                src={service.img}
                alt={service.name}
                className="h-full w-full object-contain"
              />
            </div>

            <h3 className="mt-2 font-display text-3xl">
              {service.name}
            </h3>

            <p className="mt-3 min-h-12 text-sm text-hueso/60">
              {service.description}
            </p>

            <div className="mt-7 flex items-center justify-between border-t border-bronce/20 pt-4 text-[9px] font-bold tracking-widest text-arena">
              <span>DURACIÓN</span>
              <strong className="text-hueso">{service.time}</strong>
            </div>

            <div className="my-5 flex items-baseline justify-end gap-3">
              {service.oldPrice && (
                <del className="text-xs text-hueso/40">
                  {service.oldPrice}
                </del>
              )}
              <strong className="text-2xl text-bronce">
                {service.price}
              </strong>
            </div>

            <Cta className="mt-auto w-full">
              RESERVAR {service.name}
            </Cta>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-[9px] font-extrabold tracking-[.16em] text-arena">
        EFICIENCIA SIN PERDER LA EXPERIENCIA.
      </p>
    </section>
  );
}

export function BenefitsSection() {
  return <section id="por-que" className="bg-gradient-to-b from-[#201910] to-[#050403] px-5 py-12 sm:px-5 lg:px-[9vw]">
    <SectionTitle kicker="SIN VUELTAS. ESTO OBTIENES.">HECHO PARA TI.<br /><span className="text-bronce">DE PRINCIPIO A FIN.</span></SectionTitle>
    <div className="grid gap-px bg-bronce/20 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(item => <Reveal key={item.number} className="min-h-64 bg-[#0b0907] p-7"><span className="text-xs font-bold text-bronce">{item.number}</span><Check /><h3 className="mt-7 text-sm font-extrabold tracking-wider">{item.title}</h3><p className="mt-3 text-sm text-hueso/60">{item.description}</p></Reveal>)}</div>
    <div className="mt-10 text-center"><Cta>RESERVAR SIN PENA</Cta></div>
  </section>
}

export function ProofSection() {
  return (
    <section className="bg-black px-5 py-12 sm:px-5 lg:px-[9vw]">
      <SectionTitle kicker="HOMBRES REALES. CERO DISCURSO.">
        ÉL TAMBIÉN<br />
        <span className="text-bronce">TENÍA DUDAS.</span>
      </SectionTitle>

      <div className="mx-auto grid max-w-4xl items-center overflow-hidden border border-bronce/25 bg-[#0a0806] md:grid-cols-[0.85fr_1.15fr]">

        {/* Imagen de Santiago */}
        <div className="flex h-full items-center justify-center p-3 sm:p-4">
          <img
            src="../public/images/santiago.png"
            alt="Santiago, cliente de Primitivos"
            className="max-h-72 w-full rounded-sm object-contain sm:max-h-80"
          />
        </div>

        {/* Testimonio */}
        <div className="px-5 py-5 sm:px-7 sm:py-6">
          <span className="font-serif text-5xl leading-none text-bronce">“</span>

          <h3 className="mt-1 font-display text-3xl sm:text-4xl">
            SANTIAGO, 29.
          </h3>

          <div className="mt-3 space-y-2">
            <p className="text-sm leading-relaxed text-hueso/65">
              Entrena cuatro veces por semana, cuida su barba y presta atención a cada detalle.
            </p>

            <p className="text-sm leading-relaxed text-hueso/65">
              Pero nunca había dedicado tiempo al cuidado de sus manos y pies.
            </p>

            <p className="text-sm leading-relaxed text-hueso/65">
              En Primitivos encontró un espacio diferente, sin prejuicios y con una experiencia hecha para él.
            </p>
          </div>

          <strong className="mt-4 block text-[9px] tracking-widest text-bronce">
            CASO DE MARCA · MEDELLÍN
          </strong>
        </div>

      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {[
          {
            quote:
              'Una experiencia diferente. El lugar tiene mucho estilo, la atención es excelente y el cuidado en cada detalle se nota.',
            name: 'CLIENTE PRIMITIVOS',
            service: 'MANICURA',
          },
          {
            quote:
              'Nunca había dedicado tiempo al cuidado de mis pies. El servicio fue impecable y me sentí cómodo desde el primer momento.',
            name: 'CLIENTE PRIMITIVOS',
            service: 'PEDICURA',
          },
          {
            quote:
              'Me gustó el ambiente, la atención y el resultado. Un espacio pensado para hombres que también valoramos nuestra imagen.',
            name: 'CLIENTE PRIMITIVOS',
            service: 'EXPERIENCIA COMBO',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border border-bronce/30 bg-[#0a0806] p-5 transition-colors duration-300 hover:border-bronce/70"
          >
            <span className="tracking-widest text-bronce">★★★★★</span>

            <p className="my-4 text-sm leading-relaxed text-hueso/70">
              “{item.quote}”
            </p>

            <div className="border-t border-bronce/20 pt-3">
              <small className="block text-[10px] font-bold tracking-widest text-hueso">
                {item.name}
              </small>
              <small className="mt-1 block text-[9px] tracking-wider text-bronce">
                {item.service}
              </small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AudienceSection() {
  return <section className="relative overflow-hidden bg-cuero px-5 py-12 sm:px-5 lg:px-[9vw]"><Reveal className="relative z-10 max-w-3xl"><Kicker>ESTO ES PARA TI SI…</Kicker><h2 className="font-display text-5xl leading-[.98] sm:text-7xl">ENTRENAS. TRABAJAS.<br />SALES. <span className="text-bronce">TE CUIDAS.</span></h2><p className="mt-7 text-sm text-hueso/65">Cuidas tu ropa, tus tenis y tu barba.</p><p className="mt-2 text-sm text-hueso/65">Solo faltaban tus manos. Hasta hoy.</p><blockquote className="my-8 border-l-2 border-bronce py-3 pl-5 text-lg font-bold text-arena">NO BUSCAS SOLO MANICURA. BUSCAS PERMISO. AQUÍ LO TIENES.</blockquote><Cta>AGENDAR MI PRIMERA CITA</Cta></Reveal><div className="mt-16 flex flex-col items-center opacity-40 lg:absolute lg:bottom-10 lg:right-[10%]"><span className="font-display text-[8rem] leading-none text-transparent [-webkit-text-stroke:1px_#c8a66b]">18—45</span><small className="text-[9px] tracking-[.18em] text-bronce">HOMBRES QUE CUIDAN CADA DETALLE</small></div></section>
}

export function FaqSection() {
  return <section id="faq" className="bg-[#050403] px-5 py-12 sm:px-5 lg:px-[9vw]"><SectionTitle kicker="LO QUE QUIERES SABER">PREGUNTAS DIRECTAS.<br /><span className="text-bronce">RESPUESTAS CLARAS.</span></SectionTitle><div className="border-t border-bronce/30">{faqs.map((faq, index) => <details key={faq.question} className="group border-b border-bronce/30"><summary className="grid min-h-20 cursor-pointer grid-cols-[30px_1fr_20px] items-center gap-2 text-xs font-extrabold tracking-wider"><span className="text-bronce">0{index + 1}</span>{faq.question}<b className="text-xl font-light text-bronce transition group-open:rotate-45">+</b></summary><p className="pb-6 pl-10 pr-5 text-sm text-hueso/60">{faq.answer}</p></details>)}</div><div className="mt-10 text-center"><Cta>RESERVAR AHORA</Cta></div></section>
}

export function BookingSection() {
  const [submittedName, setSubmittedName] = useState('')
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('nombre') || '')
    setSubmittedName(name)
    const message = ['Hola, quiero reservar mi cita en Primitivos.', `Nombre: ${name}`, `WhatsApp: ${data.get('whatsapp')}`, `Servicio: ${data.get('servicio')}`, `Fecha: ${data.get('fecha')}`, `Franja: ${data.get('franja')}`].join('\n')
    // Integrar aquí un webhook o sistema de reservas cuando esté disponible.
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }
  const fields = [
    { name: 'nombre', label: 'NOMBRE', placeholder: 'Tu nombre', type: 'text' },
    { name: 'whatsapp', label: 'WHATSAPP', placeholder: '+57 300 000 0000', type: 'tel' },
    { name: 'fecha', label: 'FECHA', type: 'date' },
  ]
  return <section id="reservar" className="grid gap-12 bg-[radial-gradient(circle_at_20%_20%,#42311e,#211910_40%,#080604_100%)] px-5 py-12 sm:px-5 lg:grid-cols-2 lg:px-[9vw]">
    <Reveal><Kicker>SIN CUENTA. SIN PASOS INNECESARIOS.</Kicker><h2 className="font-display text-6xl leading-[.9] sm:text-8xl">TU CITA.<br />SIN JUICIOS.<br /><span className="text-bronce">SIN VUELTAS.</span></h2><div className="mt-8 flex flex-col border border-bronce p-5"><span className="text-[9px] font-bold tracking-widest text-arena">OFERTA DE LANZAMIENTO</span><strong className="text-lg text-bronce">{OFFER}</strong><small className="mt-2 text-[9px] tracking-wider text-arena">CUPOS LIMITADOS · VÁLIDA HASTA 31/11/2026</small></div><div className="mt-5 flex gap-2">{['DÍAS', 'HORAS', 'MIN'].map(unit => <div key={unit} className="min-w-16 border border-bronce/25 p-3 text-center"><b className="block font-display text-3xl">00</b><span className="text-[8px] tracking-widest text-hueso/50">{unit}</span></div>)}</div><small className="mt-2 block text-[8px] text-hueso/50">[ACTIVAR CON FECHA REAL]</small></Reveal>
    <Reveal className="border border-bronce/25 bg-black/60 p-5 sm:p-8">
      {submittedName ? <div className="flex min-h-80 flex-col items-center justify-center text-center" role="status"><Check /><h3 className="mt-6 font-display text-4xl">LISTO, {submittedName.toUpperCase()}.</h3><p className="mt-3 text-sm text-hueso/60">Te escribimos por WhatsApp para confirmar tu cita.</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 border-b border-bronce pb-1 text-xs font-bold text-bronce">ABRIR WHATSAPP <Arrow /></a></div> : <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
        {fields.map(field => <label key={field.name} className={field.name === 'nombre' ? 'sm:col-span-2' : ''}><span className="mb-2 block text-[9px] font-extrabold tracking-widest text-bronce">{field.label}</span><input name={field.name} type={field.type} placeholder={field.placeholder} required className="h-12 w-full border-0 border-b border-arena/50 bg-white/[.04] px-3 text-sm text-hueso outline-none transition placeholder:text-hueso/30 focus:border-bronce focus:bg-bronce/[.07]" /></label>)}
        <label><span className="mb-2 block text-[9px] font-extrabold tracking-widest text-bronce">SERVICIO</span><select name="servicio" defaultValue="" required className="h-12 w-full border-0 border-b border-arena/50 bg-[#17120d] px-3 text-sm text-hueso outline-none focus:border-bronce"><option value="" disabled>Selecciona uno</option><option>Manicura</option><option>Pedicura</option><option>Combo</option></select></label>
        <label><span className="mb-2 block text-[9px] font-extrabold tracking-widest text-bronce">FRANJA HORARIA</span><select name="franja" defaultValue="" required className="h-12 w-full border-0 border-b border-arena/50 bg-[#17120d] px-3 text-sm text-hueso outline-none focus:border-bronce"><option value="" disabled>Elige una franja</option><option>Mañana</option><option>Tarde</option><option>Noche</option></select></label>
        <button type="submit" data-conversion="form-submit" className="inline-flex min-h-12 items-center justify-center gap-3 bg-bronce px-5 py-3 text-[10px] font-black tracking-widest text-black transition hover:bg-hueso sm:col-span-2">CONFIRMAR MI CITA <Arrow /></button>
      </form>}
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mx-auto mt-6 flex w-fit items-center gap-2 border-b border-bronce pb-1 text-[10px] font-extrabold tracking-wider text-bronce">RESERVAR POR WHATSAPP <Arrow /></a><div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center text-[8px] tracking-wider text-hueso/50">ATENCIÓN PRIVADA <i className="h-1 w-1 rounded-full bg-bronce" /> SIN JUICIOS <i className="h-1 w-1 rounded-full bg-bronce" /> CUPOS LIMITADOS</div>
    </Reveal>
  </section>
}
