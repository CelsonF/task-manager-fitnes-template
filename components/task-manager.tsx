'use client'

import { useState, useEffect } from "react"
import { AddTaskForm } from "@/components/add-task-form"
import { TaskList } from "@/components/task-list"
import { MiniCalendar } from "@/components/mini-calendar"
import { TaskCounter } from "@/components/task-counter"
import { TimeZoneSelector } from "@/components/time-zone-selector"
import { Task } from "@/lib/types"
import {
  generateId,
  saveTasksToLocalStorage,
  getTasksFromLocalStorage,
  getCompletedTasksByDate,
  getCurrentLocalDate,
  timeZones
} from "@/lib/utils"

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [timeZone, setTimeZone] = useState(timeZones[0].value)

  useEffect(() => {
    setTasks(getTasksFromLocalStorage())
  }, [])

  useEffect(() => {
    saveTasksToLocalStorage(tasks)
  }, [tasks])

  const addTask = (text: string) => {
    const newTask: Task = {
      id: generateId(),
      text,
      completed: false,
      createdAt: getCurrentLocalDate(timeZone),
      completedAt: null,
    }
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id: string) => {
    const currentDate = getCurrentLocalDate(timeZone);
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { 
            ...task, 
            completed: !task.completed, 
            completedAt: !task.completed ? currentDate : null 
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const completedTasks = getCompletedTasksByDate(tasks)

  const handleTimeZoneChange = (newTimeZone: string) => {
    setTimeZone(newTimeZone)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        <div className="flex justify-between items-center">
          <AddTaskForm onAddTask={addTask} />
          <TimeZoneSelector selectedTimeZone={timeZone} onTimeZoneChange={handleTimeZoneChange} />
        </div>
        <TaskCounter tasks={tasks} />
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">Tarefas</h2>
          <TaskList tasks={tasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">Histórico</h2>
        <MiniCalendar completedTasks={completedTasks} timeZone={timeZone} />
      </div>
    </div>
  )
}

