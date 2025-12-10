'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useState } from 'react'
import Calendar from './calendar/calendar'
import { Mode } from '@/types/calendar.types'

export default function CalendarPage() {
    const [mode, setMode] = useState<Mode>('month')
    const [date, setDate] = useState<Date>(new Date())

    return (
      <div className="flex flex-1 flex-col gap-4 py-4">          
          <Card>
            <CardHeader className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle>Calendario</CardTitle>
                <CardDescription>Administra, añade o edita tus citas, recordatorios y eventos.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
                <Calendar
                    mode={mode}
                    setMode={setMode}
                    date={date}
                    setDate={setDate}
                />
                </CardContent>
          </Card>
      </div>
    );
}