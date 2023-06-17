import { STATUS } from "./constant";
import { FormDataType } from "../Form";
import { TaskListType, TaskType } from ".";
import { v4 as uuidv4 } from "uuid";

export const calculatePriorityRanking = (
  important: boolean,
  urgent: boolean,
  estimatedTimeInMins: number
): number => {
  const effort = estimatedTimeInMins <= 15;
  return +urgent * 10 + +important * 100 + +effort * 1000;
};

export const calculateQuadrant = (priorityRanking: number): number => {
  if (priorityRanking >= 0 && priorityRanking < 0.25) {
    return 1;
  } else if (priorityRanking < 0.5) {
    return 2;
  } else if (priorityRanking < 0.75) {
    return 3;
  } else if (priorityRanking <= 1) {
    return 4;
  } else {
    return 1;
  }
};

export const formatAddFormValuesToTask = (values: FormDataType): TaskType => {
  const priorityRanking = calculatePriorityRanking(
    values.important,
    values.urgent,
    values.estimatedTimeInMins
  );
  const quadrant = calculateQuadrant(priorityRanking);
  return {
    id: uuidv4(),
    title: values.title,
    description: values.description,
    status: STATUS.PENDING,
    archivedDate: null,
    scheduledDate: values.scheduledDate,
    createdDate: new Date(),
    completionDate: null,
    skippedDate: null,
    tag: values.tag,
    priorityRanking,
    quadrant,
    important: values.important,
    urgent: values.urgent,
    estimatedTimeInMins: values.estimatedTimeInMins,
  };
};

export const formatEditFormValuesToTask = (
  values: FormDataType,
  task: TaskType
): TaskType => {
  const priorityRanking = calculatePriorityRanking(
    values.important,
    values.urgent,
    values.estimatedTimeInMins
  );
  const quadrant = calculateQuadrant(priorityRanking);
  return {
    ...task,
    title: values.title,
    description: values.description,
    scheduledDate: values.scheduledDate,
    tag: values.tag,
    priorityRanking,
    quadrant,
    important: values.important,
    urgent: values.urgent,
    estimatedTimeInMins: values.estimatedTimeInMins,
  };
};

export const prioritize = (tasks: TaskListType): TaskListType => {
  return tasks.sort(
    (taskA, taskB) => taskB.priorityRanking - taskA.priorityRanking
  );
};
