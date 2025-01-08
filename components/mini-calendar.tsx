'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MiniCalendarProps {
  completedTasks: { [date: string]: number }
}

export function MiniCalendar({ completedTasks }: MiniCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    )
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    )
  }

  return (
    <div className="w-64">
      <div className="flex justify-between items-center mb-2">
        <Button variant="outline" size="sm" onClick={prevMonth} className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </span>
        <Button variant="outline" size="sm" onClick={nextMonth} className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
          <div key={`day-${index}`} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          )
          const dateString = date.toISOString().split("T")[0]
          const completedCount = completedTasks[dateString] || 0

          return (
            <div
              key={day}
              className={`text-center p-1 ${
                completedCount > 0 ? "bg-green-200 dark:bg-green-800 rounded" : ""
              }`}
            >
              {day}
              {completedCount > 0 && (
                <div className="text-xs text-green-700 dark:text-green-300 font-bold">{completedCount}</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

