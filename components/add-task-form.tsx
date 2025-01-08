'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle } from 'lucide-react'

interface AddTaskFormProps {
  onAddTask: (task: string) => void
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [task, setTask] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task.trim()) {
      onAddTask(task)
      setTask("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Adicionar nova tarefa"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-700">
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar
      </Button>
    </form>
  )
}

