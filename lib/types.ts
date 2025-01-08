export interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: string
  completedAt: string | null
}
