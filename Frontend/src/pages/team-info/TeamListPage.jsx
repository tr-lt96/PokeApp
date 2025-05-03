import { Container, Flex, Card } from "@mantine/core";
import { Text } from "../../components/shared/core";
import { TeamListItem } from "../../components/team-info/TeamListItem";
import { useUser } from "../../components/auth/context/AuthContext";
import { AddTeamAction } from "../../components/team-info/AddTeamAction";

export const TeamListPage = () => {
  const { teams = [] } = useUser();

  return (
    <Container w={"100%"} p={0}>
      <Text variant={"heading-xl-strong"}>Teams</Text>
      <Text mb={"md"}>Every single team, all yours trully! </Text>

      <AddTeamAction />
      <Flex direction={"column"} gap={"md"} mt={"md"}>
        {teams.map((team, index) => {
          return <TeamListItem key={`team-${index}`} team={team} />;
        })}
      </Flex>
    </Container>
  );
};
