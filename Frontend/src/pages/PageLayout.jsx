import { Container, Flex } from "@mantine/core";
import { Outlet } from "react-router";
import { NavigationBar } from "../components/navigation/NavigationBar";
import { Message } from "../components/shared/core/Message";
import { UserProvider } from "../components/auth/context/AuthContext";

export const PageLayout = () => {
  return (
    <UserProvider>
      <Container miw={"100%"} mih={"100vh"}>
        <Flex w={"100%"} justify={"center"} direction={"column"}>
          <Container w={"100%"} maw={900} px={0} py={"md"}>
            <NavigationBar />
            <Outlet />
          </Container>
        </Flex>
        <Message />
      </Container>
    </UserProvider>
  );
};
