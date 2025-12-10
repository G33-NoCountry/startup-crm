import type { CalendarProps } from '@/types/calendar.types'
import CalendarHeader from './header/calendar-header'
import CalendarBody from './body/calendar-body'
import CalendarHeaderActions from './header/actions/calendar-header-actions'
import CalendarHeaderDate from './header/date/calendar-header-date'
import CalendarHeaderActionsMode from './header/actions/calendar-header-actions-mode'
import CalendarHeaderActionsAdd from './header/actions/calendar-header-actions-add'
import CalendarProvider from './calendar-provider'

import { useCalendarEvents } from '@/hooks/use-calendar-events'
import { Skeleton } from '@/components/ui/skeleton'

export default function Calendar({
  mode,
  setMode,
  date,
  setDate,
  calendarIconIsToday = true,
}: CalendarProps) {
  // Hook para obtener los datos del servidor (desde la caché de TanStack Query)
  const { data: events, isLoading, isError, error } = useCalendarEvents()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-[500px] w-full" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center p-8 text-center text-red-500">
        <p>Error al cargar los eventos del calendario: {error.message}</p>
        <p className="text-sm text-gray-500">Intente recargar la página.</p>
      </div>
    )
  }

  return (
    <CalendarProvider
      mode={mode}
      setMode={setMode}
      date={date}
      setDate={setDate}
      calendarIconIsToday={calendarIconIsToday}
    >
      <CalendarHeader>
        {/* Pasamos events al componente de fecha del encabezado */}
        <CalendarHeaderDate events={events || []}/>
        <CalendarHeaderActions>
          <CalendarHeaderActionsMode />
          <CalendarHeaderActionsAdd />
        </CalendarHeaderActions>
      </CalendarHeader>
      {/* Pasamos los eventos obtenidos del Query al cuerpo del calendario */}
      <CalendarBody events={events || []} />
    </CalendarProvider>
  )
}
