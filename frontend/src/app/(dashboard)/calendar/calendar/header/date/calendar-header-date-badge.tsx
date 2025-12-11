import { useCalendarContext } from '../../calendar-context'
import { isSameMonth } from 'date-fns'
import { CalendarEvent } from '@/types/calendar.types'

export default function CalendarHeaderDateBadge(
{
  events, // Aceptamos events como prop
}: {
  events: CalendarEvent[]
}) {
  const { date } = useCalendarContext()
  const monthEvents = events.filter((event) => isSameMonth(event.start, date))

  if (!monthEvents.length) return null
  return (
    <div className="whitespace-nowrap rounded-sm border px-1.5 py-0.5 text-xs">
      {monthEvents.length} events
    </div>
  )
}
