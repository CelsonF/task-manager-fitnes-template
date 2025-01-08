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
    if (task.completed && task.completedAt) {
      const date = task.completedAt.split('T')[0]
      completedTasks[date] = (completedTasks[date] || 0) + 1
    }
  })

  return completedTasks
}

export function getCurrentLocalDate(timeZone: string): string {
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }
  return new Intl.DateTimeFormat('en-US', options).format(now).replace(/(\d+)\/(\d+)\/(\d+),/, '$3-$1-$2T')
}

export const timeZones = [
  { label: 'Brasil - São Paulo', value: 'America/Sao_Paulo' },
  { label: 'EUA - Nova York', value: 'America/New_York' },
  { label: 'EUA - Los Angeles', value: 'America/Los_Angeles' },
  { label: 'EUA - Chicago', value: 'America/Chicago' },
]


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
