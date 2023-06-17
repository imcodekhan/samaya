import { randomId } from "@mantine/hooks";
import { STATUS } from "./constant";
import { FormDataType } from "../Form";
import { TaskListType, TaskType } from ".";

export const formatAddFormValuesToTask =(values:FormDataType):TaskType=>{
return {
        id:Number(randomId),
        title: values.title,
        description: values.description,
        status:STATUS.PENDING,
        archivedDate: null,
        scheduledDate: values.scheduledDate,
        createdDate: new Date(),
        completionDate: null,
        skippedDate: null,
        tag:values.tag,
        priority:
          Number(values.important) + Number(values.urgent) + values.estimatedTimeInMins,
        important: values.important,
        urgent: values.urgent,
        estimatedTimeInMins: values.estimatedTimeInMins,
      };
}

export const formatEditFormValuesToTask =(values:FormDataType,task:TaskType):TaskType=>{
  return {
          ...task,          
          title: values.title,
          description: values.description,
          scheduledDate: values.scheduledDate,
          tag:values.tag,
          priority:
            Number(values.important) + Number(values.urgent) + values.estimatedTimeInMins,
          important: values.important,
          urgent: values.urgent,
          estimatedTimeInMins: values.estimatedTimeInMins,
        };
  }

  export const abracaDabra=(tasks:TaskListType):TaskListType=>{
    return tasks.sort((a,b)=>a.priority-b.priority)

  }
