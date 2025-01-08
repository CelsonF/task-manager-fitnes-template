import { Task } from "@/lib/types"

interface TaskCounterProps {
  tasks: Task[]
}

export function TaskCounter({ tasks }: TaskCounterProps) {
  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length

  return (
    <div className="flex justify-between items-center bg-orange-100 dark:bg-orange-900 p-4 rounded-lg shadow-md">
      <div className="text-orange-800 dark:text-orange-200">
        <span className="font-bold">{completedTasks}</span> tarefas concluídas
      </div>
      <div className="text-blue-800 dark:text-blue-200">
        <span className="font-bold">{totalTasks}</span> tarefas no total
      </div>
    </div>
  )
}

