import { Image, Text, List, ThemeIcon, rem, Flex } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image from "../../Assets/dhyaan.png";

export function HeroBullets() {
  return (
    <Flex justify={"center"} p={20}>
      <Image
        style={{
          backgroundColor: "white",
          borderRadius: "8px 0px 0px 8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        }}
        styles={{
          image: {
            padding: 20,
          },
        }}
        height={190}
        width={190}
        src={image}
      />
      <Flex
        direction={"column"}
        style={{
          backgroundColor: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          padding: 20,
          borderRadius: "0px 8px 8px 0px",
        }}
      >
        <Text color="dimmed" size={22}>
          <b>Samaya</b> is a modern todo list with AI capabilities.
        </Text>

        <List
          mt={15}
          spacing="sm"
          size="sm"
          icon={
            <ThemeIcon size={20} radius="xl">
              <IconCheck size={rem(12)} stroke={1.5} />
            </ThemeIcon>
          }
        >
          <List.Item>
            <b>Manage</b> – effortlessly at your fingertips.
          </List.Item>
          <List.Item>
            <b>Priotise</b> – tasks with our magical AI technology.
          </List.Item>
          <List.Item>
            <b>Analyze</b> – which taska are taking most of your time.
          </List.Item>
        </List>
      </Flex>
    </Flex>
  );
}
