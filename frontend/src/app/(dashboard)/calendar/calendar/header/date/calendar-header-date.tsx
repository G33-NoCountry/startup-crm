import { useCalendarContext } from '../../calendar-context'
import { format } from 'date-fns'
import CalendarHeaderDateIcon from './calendar-header-date-icon'
import CalendarHeaderDateChevrons from './calendar-header-date-chevrons'
import CalendarHeaderDateBadge from './calendar-header-date-badge'
import { CalendarEvent } from '@/types/calendar.types'

export default function CalendarHeaderDate(
{
  events, // Aceptamos events como prop
}: {
  events: CalendarEvent[]
}) {
  const { date } = useCalendarContext()
  return (
    <div className="flex items-center gap-2">
      <CalendarHeaderDateIcon />
      <div>
        <div className="flex items-center gap-1">
          <p className="text-lg font-semibold">{format(date, 'MMMM yyyy')}</p>
          {/* Pasamos events al badge */}
          <CalendarHeaderDateBadge events={events}/>
        </div>
        <CalendarHeaderDateChevrons />
      </div>
    </div>
  )
}
