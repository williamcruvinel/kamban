import { Box, Flex, Heading } from "@radix-ui/themes"
import { CreateTaskFrom } from "./components/CreateTaskForm"
import { TaskBoard } from "./components/TaskBoard"
import { TasksContxtProvider } from "./contexts/TesksContext"

function App() {
 
  return (
    <TasksContxtProvider>
      <Box maxWidth="80rem" mx="auto">
        <Box height="4rem">
          <Flex align="center" justify={'between'} mx={'4'}  height="100%">
            <Heading size="8" weight="light">React Kamban</Heading>
            <CreateTaskFrom />
          </Flex>
        </Box>
        <Box>
          <Heading as="h2" m={'4'}>Quadro de tarefas</Heading>
          <TaskBoard>

          </TaskBoard>
        </Box>
      </Box>
    </TasksContxtProvider>
  )
}

export default App
