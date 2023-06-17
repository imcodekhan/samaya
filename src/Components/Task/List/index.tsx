import { TaskListType } from "..";
import { Accordion } from "@mantine/core";
import Item from "./Item";
import { IconPlus } from "@tabler/icons-react";
import { FormDataType } from "../../Form";
type ListProps = {
  tasks: TaskListType;
  handleAction: (
    action: string,
    payload: { id: string; date?: Date | null }
  ) => void;
  handleEditTask: (values: FormDataType, id: string) => void;
};

const List = (props: ListProps) => {
  const { tasks, handleAction, handleEditTask } = props;

  return (
    <Accordion
      multiple
      chevronPosition="left"
      chevron={<IconPlus size="1rem" />}
      styles={{
        chevron: {
          "&[data-rotate]": {
            transform: "rotate(45deg)",
          },
        },
      }}
    >
      {tasks.map((task) => {
        return (
          <Item
            key={task.id}
            task={task}
            handleAction={handleAction}
            handleEditTask={handleEditTask}
          />
        );
      })}
    </Accordion>
  );
};

export default List;
