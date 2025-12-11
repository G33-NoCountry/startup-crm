import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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


import { calendarEventFormSchema, CalendarEventFormValues } from '@/lib/validations/calendar.schema'
import { useCreateCalendarEvent } from '@/hooks/use-calendar-events'
import { useContactsForSelect, useDealsForSelect } from '@/hooks/use-crm-data'
import { toast } from 'sonner'

// Usamos el esquema importado y su tipo
const formSchema = calendarEventFormSchema

export default function CalendarNewEventDialog() {
  const { newEventDialogOpen, setNewEventDialogOpen, date } =
    useCalendarContext()

  // Usamos el hook de mutación
  const createMutation = useCreateCalendarEvent()
  const isPending = createMutation.isPending

  // Hooks para obtener datos de Combobox
  const { data: contactOptions = [], isLoading: loadingContacts } = useContactsForSelect()
  const { data: dealOptions = [], isLoading: loadingDeals } = useDealsForSelect()

  const form = useForm<CalendarEventFormValues>({ // 👈 Usamos el tipo importado
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      start: format(date, "yyyy-MM-dd'T'HH:mm"),
      end: format(date, "yyyy-MM-dd'T'HH:mm"),
      color: 'blue',
      contact_id: undefined, 
      deal_id: undefined,
    },
  })

  function onSubmit(values: CalendarEventFormValues) {
    createMutation.mutate(values, {
        onSuccess: () => {
            toast.success('Evento creado con éxito')
            setNewEventDialogOpen(false)
            form.reset()
        },
        onError: (error) => {
            // console.error(error)
            toast.error('Error al crear el evento')
        }
    })
  }

  return (
    <Dialog open={newEventDialogOpen} onOpenChange={setNewEventDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nuevo evento</DialogTitle>
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
                    <Input placeholder="Ingrese el titulo del evento" {...field} />
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
                      disabled={isPending}
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
                      disabled={isPending}
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

            <div className="flex justify-end">
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Creando...' : 'Crear evento'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
