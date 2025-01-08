'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { Task } from "@/lib/types"

interface TaskListProps {
  tasks: Task[]
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center space-x-2">
          <Checkbox
            id={task.id}
            checked={task.completed}
            onCheckedChange={() => onToggleTask(task.id)}
            className="border-green-500 text-green-500"
          />
          <label
            htmlFor={task.id}
            className={`flex-grow ${
              task.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-blue-800 dark:text-blue-200"
            }`}
          >
            {task.text}
          </label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteTask(task.id)}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  )
}

