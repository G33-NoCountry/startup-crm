import { useCalendarContext } from '../calendar-context'
import CalendarBodyDay from './day/calendar-body-day'
import CalendarBodyWeek from './week/calendar-body-week'
import CalendarBodyMonth from './month/calendar-body-month'
import { CalendarEvent } from '@/types/calendar.types'

interface CalendarBodyProps {
  events: CalendarEvent[] // Aceptamos events como prop
}

export default function CalendarBody({ events }: CalendarBodyProps) { // Recibimos events
  const { mode } = useCalendarContext()

  return (
    <>
      {mode === 'day' && <CalendarBodyDay events={events} />}
      {mode === 'week' && <CalendarBodyWeek events={events} />}
      {mode === 'month' && <CalendarBodyMonth events={events} />}
    </>
  )
}
