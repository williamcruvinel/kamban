import { useContext } from "react"
import { TasksContxt } from "../contexts/TesksContext"

export const useTasks = () => {
  return useContext(TasksContxt)
}