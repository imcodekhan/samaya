import { Button, Container, Flex, Select } from "@mantine/core";
import { FILTER_OPTIONS, STATUS } from "./constant";
import AddTask from "../../Pages/AddTask";
import { FormDataType } from "../Form";
import List from "./List";
import { TaskListType } from ".";

type TasksViewPropsType = {
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
  handleAddTask: (values: FormDataType) => void;
  tasks: TaskListType;
  handleAction: (
    action: string,
    payload: { id: string; date?: Date | null }
  ) => void;
  handleEditTask: (values: FormDataType, id: string) => void;
};

const View = ({
  selectedFilter,
  setSelectedFilter,
  handleAddTask,
  tasks,
  handleAction,
  handleEditTask,
}: TasksViewPropsType) => {
  return (
    <Container
      style={{
        backgroundColor: "white",
        maxWidth: "44.5rem",
        borderRadius: "0.5rem",
        height: "65vh",
        padding: 20,
        overflowY: "scroll",
      }}
    >
      <Flex
        justify={"space-between"}
        align={"center"}
        style={{
          borderBottom: "1px solid black",
          marginBottom: 20,
          paddingBottom: 20,
        }}
      >
        <Select
          styles={{
            root: {
              width: 110,
            },
          }}
          size="xs"
          data={FILTER_OPTIONS}
          value={selectedFilter}
          onChange={(option) => setSelectedFilter(option || STATUS.PENDING)}
        />
        <AddTask handleAddTask={handleAddTask}>
          <Button size="xs">Add Task</Button>
        </AddTask>
      </Flex>

      <List
        tasks={tasks.filter((task) => selectedFilter.includes(task.status))}
        handleAction={handleAction}
        handleEditTask={handleEditTask}
      />
    </Container>
  );
};

export default View;
