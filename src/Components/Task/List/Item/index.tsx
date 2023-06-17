import {
  Accordion,
  ActionIcon,
  Badge,
  Flex,
  Image,
  Popover,
  Text,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import check from "../../../../Assets/check.svg";
import archive from "../../../../Assets/archive.svg";
import schedule from "../../../../Assets/schedule.svg";
import edit from "../../../../Assets/edit.svg";

import { STATUS } from "../../constant";
import { TaskType } from "../..";
import EditTask from "../../../../Pages/EditTask";
import { FormDataType } from "../../../Form";

type ItemProps = {
  task: TaskType;
  handleAction: (
    action: string,
    payload: { id: number; date?: Date | null }
  ) => void;
  handleEditTask: (values: FormDataType, id: number) => void;
};

const Item = (props: ItemProps) => {
  // Extract the data from the item object
  const {
    id,
    title,
    description,
    status,
    scheduledDate,
    createdDate,
    completionDate,
    archivedDate,
    skippedDate,
    tag,
    important,
    urgent,
    estimatedTimeInMins,
  } = props.task;
  const { handleAction, handleEditTask } = props;

  // Format the date objects
  const formattedScheduledDate = scheduledDate?.toLocaleDateString();
  const formattedCreatedDate = createdDate?.toLocaleDateString();

  return (
    <Accordion.Item value={id.toString()}>
      <Flex>
        <Accordion.Control p={0}>
          <Flex direction={"column"}>
            <Flex align={"center"} justify={"space-between"}>
              <Flex align={"center"}>
                <Text size={18} c={"dimmed"}>
                  {title}
                </Text>
                <Badge style={{ marginLeft: 10 }}>{tag}</Badge>
              </Flex>
            </Flex>
            <Text size={12} c={"dimmed"}>
              {description}
            </Text>
          </Flex>
        </Accordion.Control>
        <Flex align={"center"}>
          <ActionIcon>
            <Image
              src={check}
              onClick={() => handleAction(STATUS.COMPLETED, { id })}
              height={20}
              width={20}
            />
          </ActionIcon>

          <Popover position="left" withArrow shadow="xs">
            <Popover.Target>
              <ActionIcon>
                <Image src={schedule} height={20} width={20} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <DatePicker
                size="xs"
                minDate={new Date()}
                allowDeselect
                value={scheduledDate}
                onChange={(date) => {
                  handleAction(STATUS.SCHEDULED, { id, date });
                }}
              />
            </Popover.Dropdown>
          </Popover>
          <EditTask task={props.task} handleEditTask={handleEditTask}>
            <ActionIcon>
              <Image src={edit} height={20} width={20} />
            </ActionIcon>
          </EditTask>
          <ActionIcon>
            <Image
              src={archive}
              onClick={() => handleAction(STATUS.ARCHIVED, { id })}
              height={20}
              width={20}
            />
          </ActionIcon>
        </Flex>
      </Flex>
      <Accordion.Panel ml={20}>
        <Flex justify={"space-between"}>
          <Flex mb={5} direction={"column"}>
            <Text size={12} c={"dimmed"}>
              Created on : {formattedCreatedDate}
            </Text>
            <Text size={12} c={"dimmed"}>
              Scheduled on : {formattedScheduledDate}
            </Text>
            <Text size={12} c={"dimmed"}>
              Completed on : {completionDate?.toLocaleDateString()}
            </Text>
            <Text size={12} c={"dimmed"}>
              Skipped on : {skippedDate?.toLocaleDateString()}
            </Text>
            <Text size={12} c={"dimmed"}>
              Archived on : {archivedDate?.toLocaleDateString()}
            </Text>
          </Flex>
          <Flex align={"flex-end"} direction={"column"}>
            <Text size={12} c={"dimmed"} mb={5}>
              Status: {status}
            </Text>
            <Text size={12} c={"dimmed"} mb={5}>
              Est. time: {estimatedTimeInMins} Mins
            </Text>

            <Badge variant={important ? "light" : "outlined"} mb={5}>
              Important
            </Badge>
            <Badge variant={urgent ? "light" : "outline"} mb={5}>
              Urgent
            </Badge>
          </Flex>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default Item;
