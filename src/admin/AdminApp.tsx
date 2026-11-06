
import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

type EstadoReserva =
  | 'Pendiente'
  | 'Confirmada'
  | 'Rechazada'
  | 'Cancelada'

type Reserva = {
  id: string
  nombre: string
  whatsapp: string
  servicio: string
  fecha: string
  hora_inicio: string
  hora_fin: string
  duracion_minutos: number
  estado: EstadoReserva
  created_at?: string
}

type FiltroReserva = 'Todas' | EstadoReserva

export default function AdminApp() {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const [loading, setLoading] = useState(true)
  const [checkingAccess, setCheckingAccess] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [accessError, setAccessError] = useState('')

  const [reservas, setReservas] = useState<Reserva[]>([])
  const [loadingReservas, setLoadingReservas] = useState(false)
  const [reservasError, setReservasError] = useState('')
  const [actionError, setActionError] = useState('')

  const [filtro, setFiltro] = useState<FiltroReserva>('Todas')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  // ==========================================
  // 1. COMPROBAR SESIÓN DE SUPABASE
  // ==========================================

  useEffect(() => {
    let active = true

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return

      setUser(session?.user ?? null)
      setLoading(false)
    })

    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (!active) return

      if (error) {
        setAuthError(error.message)
      }

      setUser(data.session?.user ?? null)
      setLoading(false)
    }

    checkSession()

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  // ==========================================
  // 2. VALIDAR PERMISOS DE ADMINISTRADOR
  // ==========================================

  useEffect(() => {
    if (!user) {
      setIsAdmin(false)
      setCheckingAccess(false)
      setReservas([])
      setAccessError('')
      return
    }

    let active = true

    const verifyAdmin = async () => {
      setCheckingAccess(true)
      setIsAdmin(false)
      setAccessError('')

      const { data, error } = await supabase
        .from('administradores')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!active) return

      if (error) {
        console.error('Error validando administrador:', error)
        setAccessError(
          'No fue posible verificar tus permisos de administrador.'
        )
        setIsAdmin(false)
      } else if (!data) {
        setAccessError(
          'Tu usuario no tiene permisos para acceder al panel administrativo.'
        )
        setIsAdmin(false)
      } else {
        setIsAdmin(true)
        setAccessError('')
      }

      setCheckingAccess(false)
    }

    verifyAdmin()

    return () => {
      active = false
    }
  }, [user])

  // ==========================================
  // 3. CONSULTAR RESERVAS
  // ==========================================

  const cargarReservas = useCallback(async () => {
    setLoadingReservas(true)
    setReservasError('')

    const { data, error } = await supabase
      .from('reservas')
      .select(`
        id,
        nombre,
        whatsapp,
        servicio,
        fecha,
        hora_inicio,
        hora_fin,
        duracion_minutos,
        estado,
        created_at
      `)
      .order('fecha', { ascending: true })
      .order('hora_inicio', { ascending: true })

    if (error) {
      console.error('Error consultando reservas:', error)
      setReservasError(error.message)
      setLoadingReservas(false)
      return
    }

    setReservas((data ?? []) as Reserva[])
    setLoadingReservas(false)
  }, [])

  useEffect(() => {
    if (isAdmin) {
      cargarReservas()
    }
  }, [isAdmin, cargarReservas])

  // ==========================================
  // 4. INICIAR SESIÓN
  // ==========================================

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setAuthError('')

    if (!email.trim() || !password) {
      setAuthError('Ingresa tu correo y contraseña.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      setAuthError(
        error.message === 'Invalid login credentials'
          ? 'Correo o contraseña incorrectos.'
          : error.message
      )
      setLoading(false)
    } else {
      setPassword('')
    }
  }

  // ==========================================
  // 5. CERRAR SESIÓN
  // ==========================================

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      setAuthError(error.message)
      return
    }

    setUser(null)
    setIsAdmin(false)
    setReservas([])
  }

  // ==========================================
  // 6. CAMBIAR ESTADO DE RESERVA
  // ==========================================

  const cambiarEstado = async (
    reserva: Reserva,
    nuevoEstado: EstadoReserva
  ) => {
    if (updatingId) return

    setUpdatingId(reserva.id)
    setActionError('')

    const { data, error } = await supabase
      .from('reservas')
      .update({ estado: nuevoEstado })
      .eq('id', reserva.id)
      .select(`
        id,
        nombre,
        whatsapp,
        servicio,
        fecha,
        hora_inicio,
        hora_fin,
        duracion_minutos,
        estado,
        created_at
      `)
      .single()

    if (error) {
      console.error('Error actualizando reserva:', error)

      setActionError(
        error.code === '23P01'
          ? 'No se puede reactivar esta reserva porque el horario se encuentra ocupado.'
          : `No fue posible actualizar la reserva: ${error.message}`
      )

      setUpdatingId(null)
      return
    }

    setReservas(actuales =>
      actuales.map(item =>
        item.id === reserva.id
          ? (data as Reserva)
          : item
      )
    )

    setUpdatingId(null)
  }

  // ==========================================
  // 7. FORMATEAR FECHA Y HORA
  // ==========================================

  const formatFecha = (fecha: string) => {
    const date = new Date(`${fecha}T12:00:00`)

    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'America/Bogota',
    }).format(date)
  }

  const formatHora = (hora: string) => {
    if (!hora) return '—'

    const [hours, minutes] = hora.slice(0, 5).split(':').map(Number)

    const periodo = hours >= 12 ? 'p. m.' : 'a. m.'
    const hora12 = hours % 12 || 12

    return `${hora12}:${String(minutes).padStart(2, '0')} ${periodo}`
  }

  // ==========================================
  // 8. FILTRAR RESERVAS
  // ==========================================

  const reservasFiltradas = reservas.filter(reserva => {
    return filtro === 'Todas' || reserva.estado === filtro
  })

  const pendientes = reservas.filter(
    reserva => reserva.estado === 'Pendiente'
  ).length

  const confirmadas = reservas.filter(
    reserva => reserva.estado === 'Confirmada'
  ).length

  // ==========================================
  // 9. PANTALLA DE CARGA
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080604] text-[#D6A45C]">
        <p className="text-xs tracking-[.3em]">
          CARGANDO PRIMITIVOS...
        </p>
      </div>
    )
  }

  // ==========================================
  // 10. PANTALLA DE INICIO DE SESIÓN
  // ==========================================

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080604] px-5 py-12 text-[#F5F0E8]">
        <div className="w-full max-w-md border border-[#95704D]/40 bg-[#17120d] p-7 sm:p-10">

          <p className="mb-3 text-center text-[10px] font-bold tracking-[.4em] text-[#D6A45C]">
            PRIMITIVOS
          </p>

          <h1 className="mb-2 text-center font-display text-4xl">
            ADMINISTRACIÓN
          </h1>

          <p className="mb-8 text-center text-xs text-white/50">
            Acceso exclusivo para administradores
          </p>

          <form onSubmit={handleLogin} className="grid gap-5">

            {authError && (
              <p
                role="alert"
                className="border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300"
              >
                {authError}
              </p>
            )}

            <label>
              <span className="mb-2 block text-[10px] font-bold tracking-widest text-[#D6A45C]">
                CORREO ELECTRÓNICO
              </span>

              <input
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="admin@primitivos.com"
                autoComplete="username"
                required
                className="h-12 w-full border border-[#95704D]/40 bg-black/40 px-4 text-sm outline-none focus:border-[#D6A45C]"
              />
            </label>

            <label>
              <span className="mb-2 block text-[10px] font-bold tracking-widest text-[#D6A45C]">
                CONTRASEÑA
              </span>

              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Tu contraseña"
                autoComplete="current-password"
                required
                className="h-12 w-full border border-[#95704D]/40 bg-black/40 px-4 text-sm outline-none focus:border-[#D6A45C]"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 h-12 bg-[#D6A45C] text-xs font-black tracking-widest text-black transition hover:bg-[#F5F0E8] disabled:opacity-50"
            >
              INGRESAR AL PANEL
            </button>

          </form>

          <a
            href="/"
            className="mt-8 block text-center text-[10px] tracking-widest text-white/40 hover:text-[#D6A45C]"
          >
            VOLVER AL SITIO WEB
          </a>

        </div>
      </main>
    )
  }

  // ==========================================
  // 11. VALIDAR ACCESO ADMINISTRATIVO
  // ==========================================

  if (checkingAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080604] text-[#D6A45C]">
        VERIFICANDO PERMISOS...
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080604] px-5 text-[#F5F0E8]">
        <div className="max-w-md border border-red-500/30 bg-[#17120d] p-8 text-center">

          <h1 className="mb-4 font-display text-3xl">
            ACCESO DENEGADO
          </h1>

          <p className="mb-6 text-sm text-white/60">
            {accessError || 'Tu usuario no tiene permisos de administrador.'}
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="bg-[#D6A45C] px-6 py-3 text-xs font-bold text-black"
          >
            CERRAR SESIÓN
          </button>

        </div>
      </main>
    )
  }

  // ==========================================
  // 12. PANEL ADMINISTRATIVO
  // ==========================================

  return (
    <main className="min-h-screen bg-[#080604] px-4 py-8 text-[#F5F0E8] sm:px-8 lg:px-12">

      <header className="mb-10 flex flex-wrap items-center justify-between gap-5 border-b border-[#95704D]/30 pb-6">

        <div>
          <p className="text-[10px] font-bold tracking-[.4em] text-[#D6A45C]">
            PRIMITIVOS
          </p>

          <h1 className="mt-2 font-display text-4xl">
            PANEL ADMINISTRATIVO
          </h1>

          <p className="mt-2 text-xs text-white/40">
            Sesión: {user.email}
          </p>
        </div>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={cargarReservas}
            disabled={loadingReservas}
            className="border border-[#95704D]/50 px-4 py-3 text-[10px] font-bold tracking-widest hover:border-[#D6A45C] disabled:opacity-50"
          >
            {loadingReservas ? 'ACTUALIZANDO...' : 'ACTUALIZAR'}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="bg-[#D6A45C] px-4 py-3 text-[10px] font-bold tracking-widest text-black hover:bg-[#F5F0E8]"
          >
            SALIR
          </button>

        </div>

      </header>

      {/* RESUMEN */}

      <section className="mb-10 grid gap-4 sm:grid-cols-3">

        <div className="border border-[#95704D]/30 bg-[#17120d] p-6">
          <p className="text-[10px] tracking-widest text-white/50">
            TOTAL DE RESERVAS
          </p>

          <strong className="mt-3 block font-display text-4xl">
            {reservas.length}
          </strong>
        </div>

        <div className="border border-[#95704D]/30 bg-[#17120d] p-6">
          <p className="text-[10px] tracking-widest text-white/50">
            PENDIENTES
          </p>

          <strong className="mt-3 block font-display text-4xl text-[#D6A45C]">
            {pendientes}
          </strong>
        </div>

        <div className="border border-[#95704D]/30 bg-[#17120d] p-6">
          <p className="text-[10px] tracking-widest text-white/50">
            CONFIRMADAS
          </p>

          <strong className="mt-3 block font-display text-4xl text-green-400">
            {confirmadas}
          </strong>
        </div>

      </section>

      {/* FILTROS */}

      <section className="mb-6">

        <h2 className="mb-4 font-display text-2xl">
          GESTIÓN DE RESERVAS
        </h2>

        <div className="flex flex-wrap gap-2">

          {(
            ['Todas', 'Pendiente', 'Confirmada', 'Rechazada', 'Cancelada'] as FiltroReserva[]
          ).map(opcion => (

            <button
              key={opcion}
              type="button"
              onClick={() => setFiltro(opcion)}
              className={`border px-4 py-2 text-[10px] font-bold tracking-wider transition ${
                filtro === opcion
                  ? 'border-[#D6A45C] bg-[#D6A45C] text-black'
                  : 'border-[#95704D]/40 text-white/60 hover:border-[#D6A45C]'
              }`}
            >
              {opcion.toUpperCase()}
            </button>

          ))}

        </div>

      </section>

      {/* ERRORES */}

      {(reservasError || actionError) && (
        <div
          role="alert"
          className="mb-6 border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300"
        >
          {reservasError || actionError}
        </div>
      )}

      {/* LISTADO */}

      {loadingReservas ? (

        <div className="py-16 text-center text-xs tracking-widest text-[#D6A45C]">
          CARGANDO RESERVAS...
        </div>

      ) : reservasFiltradas.length === 0 ? (

        <div className="border border-[#95704D]/30 bg-[#17120d] p-10 text-center">

          <p className="font-display text-2xl">
            NO HAY RESERVAS
          </p>

          <p className="mt-3 text-xs text-white/40">
            No encontramos reservas para este filtro.
          </p>

        </div>

      ) : (

        <section className="grid gap-4">

          {reservasFiltradas.map(reserva => (

            <article
              key={reserva.id}
              className="border border-[#95704D]/30 bg-[#17120d] p-5 sm:p-6"
            >

              <div className="mb-5 flex flex-wrap items-start justify-between gap-4">

                <div>
                  <h3 className="font-display text-2xl">
                    {reserva.nombre}
                  </h3>

                  <p className="mt-1 text-xs text-white/40">
                    {reserva.servicio}
                  </p>
                </div>

                <span
                  className={`border px-3 py-2 text-[9px] font-bold tracking-widest ${
                    reserva.estado === 'Confirmada'
                      ? 'border-green-500/40 text-green-400'
                      : reserva.estado === 'Pendiente'
                        ? 'border-[#D6A45C]/40 text-[#D6A45C]'
                        : reserva.estado === 'Rechazada'
                          ? 'border-red-500/40 text-red-400'
                          : 'border-white/20 text-white/40'
                  }`}
                >
                  {reserva.estado.toUpperCase()}
                </span>

              </div>

              <div className="mb-6 grid gap-4 text-xs sm:grid-cols-2 lg:grid-cols-4">

                <div>
                  <p className="mb-1 text-[9px] tracking-widest text-white/40">
                    WHATSAPP
                  </p>

                  <a
                    href={`https://wa.me/${reserva.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#D6A45C] hover:underline"
                  >
                    {reserva.whatsapp}
                  </a>
                </div>

                <div>
                  <p className="mb-1 text-[9px] tracking-widest text-white/40">
                    FECHA
                  </p>

                  {formatFecha(reserva.fecha)}
                </div>

                <div>
                  <p className="mb-1 text-[9px] tracking-widest text-white/40">
                    HORARIO
                  </p>

                  {formatHora(reserva.hora_inicio)} - {formatHora(reserva.hora_fin)}
                </div>

                <div>
                  <p className="mb-1 text-[9px] tracking-widest text-white/40">
                    DURACIÓN
                  </p>

                  {reserva.duracion_minutos} minutos
                </div>

              </div>

              {/* ACCIONES */}

              <div className="flex flex-wrap gap-2 border-t border-[#95704D]/20 pt-5">

                {reserva.estado === 'Pendiente' && (
                  <>
                    <button
                      type="button"
                      disabled={updatingId !== null}
                      onClick={() => cambiarEstado(reserva, 'Confirmada')}
                      className="bg-green-700 px-4 py-3 text-[9px] font-bold tracking-wider text-white disabled:opacity-40"
                    >
                      APROBAR
                    </button>

                    <button
                      type="button"
                      disabled={updatingId !== null}
                      onClick={() => cambiarEstado(reserva, 'Rechazada')}
                      className="bg-red-800 px-4 py-3 text-[9px] font-bold tracking-wider text-white disabled:opacity-40"
                    >
                      RECHAZAR
                    </button>
                  </>
                )}

                {reserva.estado === 'Confirmada' && (
                  <button
                    type="button"
                    disabled={updatingId !== null}
                    onClick={() => cambiarEstado(reserva, 'Cancelada')}
                    className="border border-red-500/50 px-4 py-3 text-[9px] font-bold tracking-wider text-red-400 disabled:opacity-40"
                  >
                    CANCELAR CITA
                  </button>
                )}

                {(reserva.estado === 'Rechazada' ||
                  reserva.estado === 'Cancelada') && (
                  <button
                    type="button"
                    disabled={updatingId !== null}
                    onClick={() => cambiarEstado(reserva, 'Pendiente')}
                    className="border border-[#D6A45C]/50 px-4 py-3 text-[9px] font-bold tracking-wider text-[#D6A45C] disabled:opacity-40"
                  >
                    REACTIVAR RESERVA
                  </button>
                )}

                {updatingId === reserva.id && (
                  <span className="self-center text-[10px] text-[#D6A45C]">
                    ACTUALIZANDO...
                  </span>
                )}

              </div>

            </article>

          ))}

        </section>

      )}

      <footer className="mt-12 border-t border-[#95704D]/20 py-6 text-center text-[9px] tracking-widest text-white/30">
        PRIMITIVOS · PANEL ADMINISTRATIVO
      </footer>

    </main>
  )
}
