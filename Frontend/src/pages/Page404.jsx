import { Container, Flex } from "@mantine/core";
import { Text } from "../components/shared/core";

export const NotFoundPage = () => {
  return (
    <Container>
      <Flex align={"center"} direction={"column"}>
        <Text variant={"heading-xl-strong"} mb={"md"}>
          Oh no, you're lost
        </Text>
        <Text>404 page not found</Text>
      </Flex>
    </Container>
  );
};
