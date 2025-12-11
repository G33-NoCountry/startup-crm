import { useCalendarContext } from '../../calendar-context'
import { isSameDay } from 'date-fns'
import { hours } from './calendar-body-margin-day-margin'
import CalendarBodyHeader from '../calendar-body-header'
import CalendarEvent from '../../calendar-event'
import { CalendarEvent as CalendarEventType } from '@/types/calendar.types'

export default function CalendarBodyDayContent({
  date,
  events, // Aceptamos events como prop
}: { 
  date: Date
  events: CalendarEventType[] // Definimos el tipo para events
}) {

  // Usamos events de la prop
  const dayEvents = events.filter((event) => isSameDay(event.start, date))

  return (
    <div className="flex flex-col flex-grow">
      <CalendarBodyHeader date={date} />

      <div className="flex-1 relative">
        {hours.map((hour) => (
          <div key={hour} className="h-32 border-b border-border/50 group" />
        ))}

        {dayEvents.map((event) => (
          // Pasamos la lista COMPLETA de eventos a CalendarEvent (necesario para calcular solapamientos)
          <CalendarEvent key={event.id} event={event} allEvents={events}/>
        ))}
      </div>
    </div>
  )
}
