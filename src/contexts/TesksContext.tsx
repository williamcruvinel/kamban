/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useEffect, useState } from "react";
import { Task } from "../interface/Tasks";
import { tasksService } from "../services/api";

export interface TasksContxtData {
  tasks: Task[],
  createTask: (attributtes: Omit<Task, 'id'>) => Promise<void>
  updateTask: (id: string, attributtes: Partial<Omit<Task, 'id'>>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

export const TasksContxt = createContext({} as TasksContxtData)

interface TasksContxtProviderProps {
  children: ReactNode
}

export const TasksContxtProvider: React.FC<TasksContxtProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  
  useEffect(() => {
    tasksService.fetchTasks().then((data) => setTasks(data))
  }, [])

  const createTask = async (attributtes: Omit<Task, 'id'>) => {
    const newTask = await tasksService.createTask(attributtes)

    setTasks((currentState) => {
      const createtedTask = [...currentState, newTask]
      return createtedTask
    })
  }

  const updateTask = async (id: string, attributtes: Partial<Omit<Task, 'id'>>) => {
    await tasksService.updateTask(id, attributtes)

    setTasks((currentState): Task[] => {
      const updatedTask = [...currentState]
      const taskIndex = updatedTask.findIndex((task) => task.id === id)
      Object.assign(updatedTask[taskIndex], attributtes)

      return updatedTask
    })
   
  }

  const deleteTask = async (id: string) => {
    await tasksService.deleteTask(id)

    setTasks((currentState) => {
      const deletedTask = currentState.filter((task => task.id !== id))
      return deletedTask
    })
  }

  return(
    <TasksContxt.Provider value={{tasks, createTask, updateTask, deleteTask}}>
      {children}
    </TasksContxt.Provider>
  )
}