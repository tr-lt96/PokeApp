import { Container, Flex } from "@mantine/core";
import { useParams } from "react-router";
import { TeamInfo } from "../../components/team-info/TeamInfo";
import { TeamTypeAnalysis } from "../../components/team-info/TeamTypeAnalysis";
import { useEffect, useState } from "react";
import { getTeamById } from "../../functions/team";
import { useMessage } from "../../components/shared/core";
import { useUser } from "../../components/auth/context/AuthContext";

export const TeamInfoPage = () => {
  const { teamId } = useParams();
  const { teams } = useUser();
  const [team, setTeam] = useState();
  const { setUserAlert } = useMessage();

  useEffect(() => {
    getTeamById(teamId, teams)
      .then((teamData) => {
        setUserAlert("Successful fetching team data", "success");
        setTeam(teamData);
      })
      .catch((error) => {
        setUserAlert("Error while fetching team data", "error");
        console.error(error);
      });
  }, []);

  if (!team) {
    return null;
  }
  return (
    <Container w={"100%"} p={0}>
      <Flex direction={"column"} gap={"md"}>
        <TeamInfo team={team} />
        <TeamTypeAnalysis teamPokemons={team.pokemons} teamId={teamId} />
      </Flex>
    </Container>
  );
};
