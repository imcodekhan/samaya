import { Modal } from "@mantine/core";
import { useState } from "react";
import Form, { FormDataType } from "../../Components/Form";

type AddTaskProps = {
  children: React.ReactNode;
  handleAddTask: (values: FormDataType) => void;
};

const AddTask = ({ children, handleAddTask }: AddTaskProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const initialValues = {
    title: "",
    description: "",
    scheduledDate: null,
    tag: "Personal",
    important: false,
    urgent: false,
    estimatedTimeInMins: 5,
  };

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title={"Add Task"}>
        <Form
          initialValues={initialValues}
          onSubmit={(values: FormDataType) => {
            handleAddTask(values);
            setOpen(false);
          }}
        />
      </Modal>

      <div onClick={() => setOpen(true)}>{children}</div>
    </>
  );
};

export default AddTask;
