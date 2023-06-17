import { Button, Container, Flex, Paper } from "@mantine/core";
import "./styles.css";
import { HeroBullets } from "../../Components/Header";
import Todo from "../../Components/Task";

const Dashboard = () => {
  return (
    <Container className="dashboard">
      <HeroBullets />
      <Todo />
    </Container>
  );
};

export default Dashboard;
