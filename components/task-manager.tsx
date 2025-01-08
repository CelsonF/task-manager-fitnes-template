'use client'

import { useState, useEffect } from "react"
import { AddTaskForm } from "@/components/add-task-form"
import { TaskList } from "@/components/task-list"
import { MiniCalendar } from "@/components/mini-calendar"
import { TaskCounter } from "@/components/task-counter"
import { Task } from "@/lib/types"
import {
  generateId,
  saveTasksToLocalStorage,
  getTasksFromLocalStorage,
  getCompletedTasksByDate,
} from "@/lib/utils"

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])

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
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const completedTasks = getCompletedTasksByDate(tasks)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        <AddTaskForm onAddTask={addTask} />
        <TaskCounter tasks={tasks} />
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">Tarefas</h2>
          <TaskList tasks={tasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">Histórico</h2>
        <MiniCalendar completedTasks={completedTasks} />
      </div>
    </div>
  )
}

