import TaskManager from '@/components/task-manager'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-200">Gerenciador de Tarefas Fitness</h1>
        <ThemeToggle />
      </div>
      <TaskManager />
    </div>
  )
}

