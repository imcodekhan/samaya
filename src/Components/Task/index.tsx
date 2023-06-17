import { STATUS, dummyData } from "./constant";
import { formatAddFormValuesToTask, formatEditFormValuesToTask } from "./utils";
import { FormDataType } from "../Form";
import View from "./View";
import { useState } from "react";

export type TaskType = {
  id: number;
  title: string;
  description: string;
  status: string;
  archivedDate?: Date | null;
  scheduledDate?: Date | null;
  createdDate?: Date | null;
  completionDate?: Date | null;
  skippedDate?: Date | null;
  tag: string;
  priority: number;
  important: boolean;
  urgent: boolean;
  estimatedTimeInMins: number;
};

export type TaskListType = TaskType[];

const Task = () => {
  const [tasks, setTasks] = useState<TaskListType>([...dummyData]);
  const [selectedFilter, setSelectedFilter] = useState<string>(STATUS.PENDING);

  const handleAction = (
    action: string,
    payload: { id: number; date?: Date | null }
  ): void => {
    const findIndex = tasks.findIndex((task) => task.id === payload.id);
    //remove the item from the array by index
    const newTodos = [...tasks];
    switch (action) {
      case STATUS.COMPLETED:
        newTodos[findIndex].status = STATUS.COMPLETED;
        newTodos[findIndex].completionDate = new Date();
        break;
      case STATUS.SKIPPED:
        newTodos[findIndex].status = STATUS.SKIPPED;
        newTodos[findIndex].skippedDate = new Date();
        break;
      case STATUS.ARCHIVED:
        newTodos[findIndex].status = STATUS.ARCHIVED;
        newTodos[findIndex].archivedDate = new Date();
        break;
      case STATUS.SCHEDULED:
        newTodos[findIndex].status = STATUS.SCHEDULED;
        newTodos[findIndex].scheduledDate = payload.date;
        break;
      default:
        break;
    }
    //set the new array
    setTasks(newTodos);
  };

  const handleAddTask = (values: FormDataType) => {
    const newTask = formatAddFormValuesToTask(values);
    setTasks((prev) => [...prev, newTask]);
  };

  const handleEditTask = (values: FormDataType, id: number) => {
    const findIndex = tasks.findIndex((task) => task.id === id);
    const newTodos = [...tasks];
    newTodos[findIndex] = {
      ...formatEditFormValuesToTask(values, tasks[findIndex]),
    };
    setTasks(newTodos);
  };

  return (
    <View
      tasks={tasks}
      selectedFilter={selectedFilter}
      setSelectedFilter={setSelectedFilter}
      handleAction={handleAction}
      handleAddTask={handleAddTask}
      handleEditTask={handleEditTask}
    />
  );
};

export default Task;
