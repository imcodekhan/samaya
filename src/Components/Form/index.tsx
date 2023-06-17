import { Button, Flex, Select, Switch, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useFormik } from "formik";
import * as Yup from "yup";
export type FormDataType = {
  title: string;
  description: string;
  scheduledDate: Date | null;
  tag: string;
  important: boolean;
  urgent: boolean;
  estimatedTimeInMins: number;
};

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Required*")
    .min(2, "Title should not be less than 2 chars")
    .max(100, "Title should not be more than 100 chars"),
  description: Yup.string()
    .min(10, "Description should not be less than 10 chars")
    .max(500, "Description should not be more than 500 chars"),
  scheduledDate: Yup.date().nullable(),
  tag: Yup.string(),
  important: Yup.bool(),
  urgent: Yup.bool(),
  estimatedTimeInMins: Yup.number()
    .required("Required*")
    .min(5, "Estimate time can not be less than 5 mins")
    .max(
      120,
      "Estimate should per task not be more than 2 hrs, please add breakdown the task into two separate tasks"
    ),
});
type FormPropsType = {
  initialValues: FormDataType;
  onSubmit: (values: FormDataType) => void;
};

const Form = ({ initialValues, onSubmit }: FormPropsType) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        style={{
          marginBottom: 10,
        }}
        name="title"
        label="Title"
        id="title"
        placeholder="what task you want to add?"
        withAsterisk
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <TextInput
        style={{
          marginBottom: 10,
        }}
        name="description"
        label="Description"
        id="description"
        placeholder="Please add some more details..."
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.errors.description}
      />

      <Select
        style={{
          marginBottom: 10,
        }}
        name="tag"
        label="Tag"
        id="tag"
        value={formik.values.tag}
        onChange={(option) => formik.setFieldValue("tag", option)}
        data={[
          { label: "Personal", value: "Personal" },
          { label: "Work", value: "Work" },
          { label: "Family", value: "Family" },
        ]}
      />

      <Flex justify={"space-between"}>
        <DatePickerInput
          name="scheduledDate"
          id="scheduledDate"
          label="Schedule Date"
          placeholder="choose date to schedule "
          value={formik.values.scheduledDate}
          onChange={(date) => formik.setFieldValue("scheduledDate", date)}
          clearable
          minDate={new Date()}
        />
        <TextInput
          style={{
            maxWidth: "53%",
          }}
          withAsterisk
          name="estimatedTimeInMins"
          id="estimatedTimeInMins"
          label="Estimated Time (in mins)"
          type="number"
          value={formik.values.estimatedTimeInMins}
          onChange={formik.handleChange}
          error={formik.errors.estimatedTimeInMins}
        />
      </Flex>
      <Flex direction={"column"} align={"flex-start"} mb={30}>
        <Switch
          style={{
            marginTop: 10,
            // maxWidth: 200,
            width: "100%",
          }}
          styles={{
            body: {
              justifyContent: "space-between",
            },
          }}
          labelPosition="left"
          checked={formik.values.important}
          onChange={(e) =>
            formik.setFieldValue("important", e.currentTarget.checked)
          }
          label={"Is it important?"}
        />
        <Switch
          style={{
            marginTop: 10,
            // maxWidth: 200,
            width: "100%",
            justifyContent: "space-between",
          }}
          styles={{
            body: {
              justifyContent: "space-between",
            },
          }}
          labelPosition="left"
          checked={formik.values.urgent}
          onChange={(e) =>
            formik.setFieldValue("urgent", e.currentTarget.checked)
          }
          label={"Is it urgent?"}
        />
      </Flex>

      <Flex justify={"flex-end"}>
        <Button type="submit">Add</Button>
      </Flex>
    </form>
  );
};

export default Form;
