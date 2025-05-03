import { Button, Container, Flex } from "@mantine/core";
import { Text } from "../shared/core";
import { PokemonInfoCard } from "../shared/info";
import { IconSearch } from "@tabler/icons-react";
import { themeColor } from "../../constants";
import { useNavigate } from "react-router";

const SearchButtonIcon = () => {
  return <IconSearch stroke={2} size={16} />;
};

export const TeamInfo = ({ team }) => {
  const { name = "Unown", pokemons = [] } = team;
  const navigate = useNavigate();

  const handleToSearch = () => {
    navigate("/pokemon/search");
  };
  return (
    <Container w={"100%"} p={0}>
      <Text variant="heading-xl-strong">{name}</Text>
      <Text>Where your team is judged!</Text>

      <Container w={"100%"} p={0} mt={"md"}>
        {pokemons.length < 6 && (
          <Button
            leftSection={<SearchButtonIcon />}
            radius={"md"}
            color={themeColor.primary}
            onClick={handleToSearch}
            size={"sm"}
          >
            Wanna add more pokemons?
          </Button>
        )}
        <Flex direction={"row"} gap={"md"} wrap={"wrap"} mt={"md"}>
          {pokemons.map((pokemonData, index) => (
            <PokemonInfoCard
              key={`pokemonInfo-${index}`}
              resultId={`pokemonInfo-${index}`}
              {...pokemonData}
            />
          ))}
        </Flex>
      </Container>
    </Container>
  );
};
