import { STATUS } from "./constant";
import {
  formatAddFormValuesToTask,
  formatEditFormValuesToTask,
  prioritize,
} from "./utils";
import { FormDataType } from "../Form";
import View from "./View";
import { useEffect, useState } from "react";
import { readTasksFromDB, writeTaskToDB } from "../../DB/utils";
export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: string;
  archivedDate?: Date | null;
  scheduledDate?: Date | null;
  createdDate?: Date | null;
  completionDate?: Date | null;
  skippedDate?: Date | null;
  tag: string;
  priorityRanking: number;
  quadrant: number;
  important: boolean;
  urgent: boolean;
  estimatedTimeInMins: number;
};

export type TaskListType = TaskType[];

const Task = () => {
  const [tasks, setTasks] = useState<TaskListType>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(STATUS.PENDING);

  useEffect(() => {
    readTasksFromDB().then((data) => {
      setTasks([...prioritize([...Object.keys(data).map((key) => data[key])])]);
    });
  }, []);

  const handleAction = (
    action: string,
    payload: { id: string; date?: Date | null }
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
    writeTaskToDB(newTodos[findIndex]);
    setTasks(newTodos);
  };

  const handleAddTask = (values: FormDataType) => {
    const newTask = formatAddFormValuesToTask(values);
    writeTaskToDB(newTask);
    setTasks((prev) => [...prioritize([...prev, newTask])]);
  };

  const handleEditTask = (values: FormDataType, id: string) => {
    const findIndex = tasks.findIndex((task) => task.id === id);
    const newTodos = [...tasks];
    const editedTask = formatEditFormValuesToTask(values, tasks[findIndex]);
    writeTaskToDB(editedTask);
    newTodos[findIndex] = {
      ...editedTask,
    };
    setTasks([...prioritize([...newTodos])]);
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
