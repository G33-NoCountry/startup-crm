import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from '@/lib/api/calendarService'
import { CalendarEvent, CreateCalendarEventDto, UpdateCalendarEventDto } from '@/types/calendar.types'

const CALENDAR_EVENTS_QUERY_KEY = ['calendarEvents']

export const useCalendarEvents = () => {
  return useQuery({
    queryKey: CALENDAR_EVENTS_QUERY_KEY,
    queryFn: getCalendarEvents,
  })
}

export const useCreateCalendarEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateCalendarEventDto) => createCalendarEvent(data),
    onSuccess: () => {
      // Invalida la lista para forzar un refetch y obtener el nuevo evento del servidor
      queryClient.invalidateQueries({ queryKey: CALENDAR_EVENTS_QUERY_KEY })
    },
  })
}

export const useUpdateCalendarEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCalendarEventDto }) =>
      updateCalendarEvent(id, data),
    onSuccess: (updatedEvent) => {
      // Actualización optimista para una UX más rápida
      queryClient.setQueryData(
        CALENDAR_EVENTS_QUERY_KEY,
        (old: CalendarEvent[] | undefined) => {
          return old?.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          )
        }
      )
    },
  })
}

export const useDeleteCalendarEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (eventId: string) => deleteCalendarEvent(eventId),
    onSuccess: (_, eventId) => {
      // Eliminación optimista
      queryClient.setQueryData(
        CALENDAR_EVENTS_QUERY_KEY,
        (old: CalendarEvent[] | undefined) => {
          return old?.filter((event) => event.id !== eventId)
        }
      )
    },
  })
}