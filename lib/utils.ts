import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


import { Task } from "./types"

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function saveTasksToLocalStorage(tasks: Task[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
}

export function getTasksFromLocalStorage(): Task[] {
  if (typeof window !== 'undefined') {
    const tasksJson = localStorage.getItem("tasks")
    return tasksJson ? JSON.parse(tasksJson) : []
  }
  return []
}

export function getCompletedTasksByDate(tasks: Task[]): { [date: string]: number } {
  const completedTasks: { [date: string]: number } = {}

  tasks.forEach((task) => {
    if (task.completed) {
      const date = task.createdAt.split("T")[0]
      completedTasks[date] = (completedTasks[date] || 0) + 1
    }
  })

  return completedTasks
}



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
