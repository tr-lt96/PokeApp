import { Container, Flex, ActionIcon, Button } from "@mantine/core";
import { Text, useMessage } from "../shared/core";
import { IconPlus, IconEye } from "@tabler/icons-react";
import { TeamMemberSpriteDisplay } from "../shared/team";
import { themeColor } from "../../constants";
import { useUser } from "../auth/context/AuthContext";
import { addPokemonToTeam } from "../../functions/team";
import { useNavigate } from "react-router";

const AddNewPokemon = ({ handleAddPokemon }) => {
  return (
    <Container w={100} p={0} m={0}>
      <Flex direction={"column"} justify={"center"} align={"center"} gap={4}>
        <ActionIcon
          color={themeColor.primary}
          variant="light"
          w={50}
          h={50}
          onClick={handleAddPokemon}
        >
          <IconPlus stroke={2} size={16} />
        </ActionIcon>
      </Flex>
    </Container>
  );
};

export const PokemonTeamDisplay = ({
  team = {},
  currentPokemon = {},
  allowAddPokemon,
}) => {
  const { name = "Unown", pokemons = [], teamId } = team;
  const { updateTeam, teams } = useUser();
  const { setUserAlert } = useMessage();
  const navigate = useNavigate();

  const canAddNewPokemon =
    allowAddPokemon &&
    pokemons.length < 6 &&
    pokemons.every((pokemon) => `${pokemon.name}` !== currentPokemon.name);

  const handleAddPokemonToTeam = () => {
    addPokemonToTeam(currentPokemon.name, teamId)
      .then((result) => {
        if (result) {
          const currentTeams = [...teams];
          const teamToUpdate = currentTeams.find(
            (team) => `${team.teamId}` === `${teamId}`
          );

          if (teamToUpdate) {
            teamToUpdate.pokemons.push(currentPokemon);
            updateTeam(currentTeams);
          }
        } else {
          setUserAlert(
            "Oops, we had some issues bringing this pokemon to your gang.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error(error);
        setUserAlert(
          "Oops, we had some issues bringing this pokemon to your gang.",
          "error"
        );
      });
  };

  const handleView = () => {
    navigate(`/team/${teamId}`);
  };

  return (
    <Container p={0} w={"100%"}>
      <Flex wrap={"wrap"} gap={"xs"} align={"center"} mb="sm">
        <Text variant={"label-lg-strong"}>{name}</Text>
        <Button
          size="xs"
          leftSection={<IconEye size={16} />}
          onClick={handleView}
          variant="light"
          color={themeColor.primary}
        >
          View analysis
        </Button>
      </Flex>
      <Flex justify={"start"} gap={"sm"} wrap={"wrap"} mb="md">
        {pokemons.map((pokemon, index) => (
          <TeamMemberSpriteDisplay
            key={`${name}-pokemon-${index}`}
            pokemon={pokemon}
            teamName={name}
            w={100}
          />
        ))}
        {canAddNewPokemon && (
          <AddNewPokemon handleAddPokemon={handleAddPokemonToTeam} />
        )}
      </Flex>
    </Container>
  );
};
