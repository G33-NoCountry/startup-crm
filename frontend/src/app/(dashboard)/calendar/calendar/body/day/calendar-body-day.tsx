import CalendarBodyDayCalendar from './calendar-body-day-calendar'
import CalendarBodyDayEvents from './calendar-body-day-events'
import { useCalendarContext } from '../../calendar-context'
import CalendarBodyDayContent from './calendar-body-day-content'
import CalendarBodyMarginDayMargin from './calendar-body-margin-day-margin'
import { CalendarEvent } from '@/types/calendar.types'

export default function CalendarBodyDay({ events }: { events: CalendarEvent[] }) {
  const { date } = useCalendarContext()
  return (
    <div className="flex divide-x flex-grow overflow-hidden">
      <div className="flex flex-col flex-grow divide-y overflow-hidden">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="relative flex flex-1 divide-x">
            <CalendarBodyMarginDayMargin />
            {/* Pasamos events, junto con date, al componente de contenido principal */}
            <CalendarBodyDayContent date={date} events={events}/>
          </div>
        </div>
      </div>
      <div className="lg:flex hidden flex-col flex-grow divide-y max-w-[276px]">
        <CalendarBodyDayCalendar />
        {/* Pasamos events a la lista lateral de eventos */}
        <CalendarBodyDayEvents events={events}/>
      </div>
    </div>
  )
}
