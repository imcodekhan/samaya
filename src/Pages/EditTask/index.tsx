import { Modal } from "@mantine/core";
import { useState } from "react";
import Form, { FormDataType } from "../../Components/Form";
import { TaskType } from "../../Components/Task";

type EditTaskProps = {
  task: TaskType;
  children: React.ReactNode;
  handleEditTask: (values: FormDataType, id: string) => void;
};

const EditTask = ({ task, children, handleEditTask }: EditTaskProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const initialValues = {
    id: task.id,
    title: task.title,
    description: task.description,
    scheduledDate: task.scheduledDate || null,
    tag: task.tag,
    important: task.important,
    urgent: task.urgent,
    estimatedTimeInMins: task.estimatedTimeInMins,
  };

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title={"Add Task"}>
        <Form
          initialValues={initialValues}
          onSubmit={(values: FormDataType) => {
            handleEditTask(values, task.id);
            setOpen(false);
          }}
        />
      </Modal>

      <div onClick={() => setOpen(true)}>{children}</div>
    </>
  );
};

export default EditTask;
