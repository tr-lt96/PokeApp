import { Drawer, Flex } from "@mantine/core";
import { PokemonTeamDisplay } from "./PokemonTeamDisplay";
import { Text } from "../shared/core";
import { useUser } from "../auth/context/AuthContext";

export const PokemonTeamListDrawer = ({ isOpen, onClose, currentPokemon }) => {
  const { teams = [] } = useUser();
  return (
    <Drawer
      title={<Text variant="heading-md-strong">Gotta add them all!</Text>}
      opened={isOpen}
      onClose={onClose}
      withCloseButton
      position="right"
    >
      <Flex gap={36} direction={"column"} w={"100%"}>
        {teams.map((team, index) => {
          return (
            <PokemonTeamDisplay
              key={`team-${index}`}
              team={team}
              currentPokemon={currentPokemon}
              allowAddPokemon
            />
          );
        })}
      </Flex>
    </Drawer>
  );
};
