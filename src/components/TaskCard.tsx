import { Badge, Button, Card, Flex, Heading, Text } from "@radix-ui/themes"
import { Task, TaskPriority, TaskStatus } from "../interface/Tasks"
import { useTasks } from "../hooks/useTasks"

interface TeskCardProps {
  task: Task
}

export const TaskCard: React.FC<TeskCardProps>= ( {task} ) =>{
  const {deleteTask, updateTask} = useTasks()

  const getActionText = (status: TaskStatus) => {
    const actionsTexts = {
      "todo": "Iniciar",
      "doing": "Concluir",
      "done": "Arquivar",
    }
    return actionsTexts[status]
  }

  const getActionColor = (status: TaskStatus) => {
    const ActionColors:{[key: string]: "indigo" | "green" | "gold"}  = {
      "todo": "indigo",
      "doing": "green",
      "done": "gold",
    }
    return ActionColors[status]
  }

  const getPriorityColor = (priority: TaskPriority) => {
    const priorityColors:{[key: string]: "sky" | "amber" | "red"}  = {
      "low": "sky",
      "medium": "amber",
      "high": "red",
    }
    return priorityColors[priority]
  }

  const hanlerDeleteTask = (id: string) => {
    const confirmation = confirm('Tem certeza que deseja excluir essa tarefa?')
    if(confirmation) {
      deleteTask(id)
    }
  }
  
  const hanlerUpdateTask = () => {
    if(task.status === 'todo') {
      updateTask(task.id, {status: "doing"})
    } else if(task.status === 'doing'){
      updateTask(task.id, {status: "done"})
    }
    
  }


  return(
    <Card>
      <Flex align={'center'} gap={'4'}>
        <Heading as="h3" size={'3'} weight={'bold'}>{task.title}</Heading>
        <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
      </Flex>
      <Text as="p" my={'4'}>{task.description}</Text>
      <Flex justify={'end'} gap={'2'}>
        {task.status !== 'done' && (
          <Button 
            color={getActionColor(task.status)}
            onClick={hanlerUpdateTask}
          >
            {getActionText(task.status)}
          </Button>
        )}

        <Button onClick={() => hanlerDeleteTask(task.id)} color={'red'}>
          Excluir
        </Button>
      </Flex>
    </Card>
  )
}