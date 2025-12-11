import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ComboboxSelect } from '@/components/ui/combobox-select' 
import { useCalendarContext } from '../calendar-context'
import { format } from 'date-fns'
import { DateTimePicker } from '../../form/date-time-picker'
import { ColorPicker } from '../../form/color-picker'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { calendarEventFormSchema, CalendarEventFormValues } from '@/lib/validations/calendar.schema'
import { useUpdateCalendarEvent, useDeleteCalendarEvent } from '@/hooks/use-calendar-events'
import { useContactsForSelect, useDealsForSelect } from '@/hooks/use-crm-data'
import { toast } from 'sonner'

// Usamos el esquema importado y su tipo
const formSchema = calendarEventFormSchema

export default function CalendarManageEventDialog() {
  const {
    manageEventDialogOpen,
    setManageEventDialogOpen,
    selectedEvent,
    setSelectedEvent,
  } = useCalendarContext()

  // Usamos los hooks de mutación
  const updateMutation = useUpdateCalendarEvent()
  const deleteMutation = useDeleteCalendarEvent()

  // Hooks para obtener datos de Combobox
  const { data: contactOptions = [], isLoading: loadingContacts } = useContactsForSelect()
  const { data: dealOptions = [], isLoading: loadingDeals } = useDealsForSelect()

  const form = useForm<CalendarEventFormValues>({ // Usamos el tipo importado
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      start: '',
      end: '',
      color: 'blue',
      contact_id: undefined, 
      deal_id: undefined,
    },
  })

  useEffect(() => {
    if (selectedEvent) {
      form.reset({
        title: selectedEvent.title,
        // Convertimos Date a string para el formulario
        start: format(selectedEvent.start, "yyyy-MM-dd'T'HH:mm"),
        end: format(selectedEvent.end, "yyyy-MM-dd'T'HH:mm"),
        color: selectedEvent.color,
        // Si el ID es un número en selectedEvent, lo convertimos a string. 
        // Si es null o undefined (o la propiedad no existe), debe ser undefined.
        contact_id: selectedEvent.contact_id ? String(selectedEvent.contact_id) : undefined,
        deal_id: selectedEvent.deal_id ? String(selectedEvent.deal_id) : undefined,
      })
    }
  }, [selectedEvent, form])

  function handleClose() {
    setManageEventDialogOpen(false)
    setSelectedEvent(null)
    form.reset()
  }

  function onSubmit(values: CalendarEventFormValues) {
    if (!selectedEvent) return

    // Llamada a la mutación de actualización
    updateMutation.mutate({
      id: selectedEvent.id,
      data: values
    }, {
        onSuccess: () => {
            toast.success('Evento actualizado con éxito')
            handleClose()
        },
        onError: (error) => {
            // console.error(error)
            toast.error('Error al actualizar el evento')
        }
    })
  }

  function handleDelete() {
    if (!selectedEvent) return
    
    // Llamada a la mutación de eliminación
    deleteMutation.mutate(selectedEvent.id, {
        onSuccess: () => {
          toast.success('Evento eliminado con éxito')
          handleClose()
        },
        onError: (error) => {
          // console.error(error)
          toast.error('Error al eliminar el evento')
        }
    })
  }

  // Deshabilita botones mientras se ejecuta una mutación
  const isMutating = updateMutation.isPending || deleteMutation.isPending

  return (
    <Dialog open={manageEventDialogOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar evento</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Titulo del evento</FormLabel>
                  <FormControl>
                    <Input placeholder="Titulo del evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Fecha de inicio</FormLabel>
                  <FormControl>
                    <DateTimePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Fecha de finalización</FormLabel>
                  <FormControl>
                    <DateTimePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contacto Combobox */}
            <FormField
              control={form.control}
              name="contact_id"
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2 pt-2'>
                  <FormLabel className="font-bold">Contacto (Opcional)</FormLabel>
                  <FormControl>
                    <ComboboxSelect
                      options={contactOptions}
                      // El valor debe ser string de ID o undefined para el Combobox.
                      value={field.value || undefined} 
                      onChange={(id) => field.onChange(id)}
                      placeholder="Seleccionar contacto"
                      loading={loadingContacts}
                      disabled={isMutating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Oportunidad (Deal) Combobox */}
            <FormField
              control={form.control}
              name="deal_id"
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2'>
                  <FormLabel className="font-bold">Oportunidad (Opcional)</FormLabel>
                  <FormControl>
                    <ComboboxSelect
                      options={dealOptions}
                      // El valor debe ser string de ID o undefined para el Combobox.
                      value={field.value || undefined}
                      onChange={(id) => field.onChange(id)}
                      placeholder="Seleccionar oportunidad"
                      loading={loadingDeals}
                      disabled={isMutating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Color</FormLabel>
                  <FormControl>
                    <ColorPicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-between gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" type="button" disabled={isMutating}>
                    {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Eliminar evento</AlertDialogTitle>
                    <AlertDialogDescription>
                      ¿Estas seguro de eliminar este evento? Esta accion no puede ser deshecha.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
                        {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar evento'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button type="submit" disabled={isMutating}>
                {updateMutation.isPending ? 'Actualizando...' : 'Actualizar evento'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
