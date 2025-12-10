export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string; // Ejemplo: 'blue', 'red', etc.
};

// Tipo para la creación (las fechas vienen como string del formulario)
export type CreateCalendarEventDto = Omit<CalendarEvent, 'id'> & {
  start: string;
  end: string;
};

// Tipo para la actualización (mismas propiedades)
export type UpdateCalendarEventDto = CreateCalendarEventDto;

// Tipos de UI/Módulo
export type Mode = 'day' | 'week' | 'month'

// Definición y exportación de calendarModes para el ToggleGroup
export const calendarModes: Mode[] = ['day', 'week', 'month']

// CalendarContextType ya no expone eventos ni su setter.
export type CalendarContextType = {
  mode: Mode
  setMode: (mode: Mode) => void
  date: Date
  setDate: (date: Date) => void
  calendarIconIsToday: boolean
  newEventDialogOpen: boolean
  setNewEventDialogOpen: (open: boolean) => void
  manageEventDialogOpen: boolean
  setManageEventDialogOpen: (open: boolean) => void
  selectedEvent: CalendarEvent | null
  setSelectedEvent: (event: CalendarEvent | null) => void
}

// CalendarProps ya no recibe eventos ni su setter.
export type CalendarProps = {
  mode: Mode
  setMode: (mode: Mode) => void
  date: Date
  setDate: (date: Date) => void
  calendarIconIsToday?: boolean
}