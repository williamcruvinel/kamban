import { Task } from "../interface/Tasks";

export const tasksService = {
  async fetchTasks(): Promise<Task[]> {
    const respose = await fetch(`${import.meta.env.VITE_API_URL}/tasks`)
    const data: Task[] = await respose.json()
    return data
  },

  async createTask (attributtes: Omit<Task, 'id'>): Promise<Task> {
    const response =  await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(attributtes)
    })

    const newTask = await response.json()
    return newTask
  },

  async updateTask (id: string, attributtes: Partial<Omit<Task, 'id'>>): Promise<Task> {
    const response =  await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(attributtes)
    })

    const updatedTask = await response.json()
    return updatedTask
  },

  async deleteTask (id: string): Promise<void> {
    const response =  await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: 'DELETE',
    })

    const deletedTask = await response.json()
    return deletedTask
  },
}