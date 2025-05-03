import { Button, Container, Flex, Skeleton, useMatches } from "@mantine/core";
import {
  PokemonAbilitesInfoCard,
  PokemonSizeInfoCard,
  PokemonSpriteDisplay,
  PokemonStatsInfoCard,
  PokemonTypeInfoCard,
} from "./PokemonAttributeInfo";
import { Text } from "../shared/core";
import { IconPlus } from "@tabler/icons-react";
import { getPokemonDisplayName } from "../../functions/utils";
import { PokeIdBadge } from "../shared/info";
import { themeColor } from "../../constants";

const mediaResponsiveSize = {
  base: `100%`,
  sm: `calc(${100 / 2}% - 12px)`,
};

const AddButtonIcon = () => {
  return <IconPlus stroke={2} size={16} />;
};

export const PokemonInfo = ({ pokemonData = {}, loading, handleAddToTeam }) => {
  const {
    stats,
    size,
    abilities = [],
    types = [],
    name = "unkown",
    spriteUrl = "",
    pokeId,
  } = pokemonData;

  const cardWidth = useMatches(mediaResponsiveSize);
  const displayName = getPokemonDisplayName(name);

  return (
    <Container w={"100%"} p={0}>
      <Flex w={"100%"} gap={"md"}>
        <Skeleton visible={loading} w={"50%"} visibleFrom={"sm"}>
          <Container h={"100%"} visibleFrom={"sm"} p={0}>
            <PokemonSpriteDisplay spriteUrl={spriteUrl} />
          </Container>
        </Skeleton>
        <Container w={cardWidth} p={0}>
          <Flex w={"100%"} direction={"column"} gap={"md"}>
            <Flex w={"100%"} justify={"space-between"} align={"flex-end"}>
              {/* Display Pokemon name and pokemon ID i.e. #025 */}
              <Skeleton visible={loading} mr={"md"}>
                <Flex align={"center"} gap={8} wrap={"wrap"} visibleFrom={"sm"}>
                  <PokeIdBadge pokeId={pokeId} />
                  <Text variant={"heading-lg-strong"}>{displayName}</Text>
                </Flex>
              </Skeleton>

              <Skeleton visible={loading} w={"fit-content"}>
                <Button
                  leftSection={<AddButtonIcon />}
                  radius={"md"}
                  onClick={handleAddToTeam}
                  color={themeColor.primary}
                  size="sm"
                >
                  {"Add to your gang(s)"}
                </Button>
              </Skeleton>
            </Flex>

            <Skeleton visible={loading}>
              <Container w={"100%"} hiddenFrom={"sm"} p={0} pos={"relative"}>
                <Container
                  pos={"absolute"}
                  left={4}
                  top={4}
                  style={{ zIndex: 20 }}
                >
                  <Flex
                    align={"center"}
                    gap={8}
                    wrap={"wrap"}
                    hiddenFrom={"sm"}
                  >
                    <Text variant={"heading-lg-strong"}>{displayName}</Text>
                    <PokeIdBadge pokeId={pokeId} />
                  </Flex>
                </Container>
                <PokemonSpriteDisplay spriteUrl={spriteUrl} />
              </Container>
            </Skeleton>

            <Skeleton visible={loading}>
              <Flex gap={"md"}>
                <PokemonTypeInfoCard types={types} />
                {size?.weight && size?.height && (
                  <PokemonSizeInfoCard
                    weight={size.weight}
                    height={size.height}
                  />
                )}
              </Flex>
            </Skeleton>

            <Skeleton visible={loading}>
              {abilities.length && (
                <PokemonAbilitesInfoCard abilities={abilities} />
              )}
            </Skeleton>

            <Skeleton visible={loading}>
              <PokemonStatsInfoCard stats={stats} />
            </Skeleton>
          </Flex>
        </Container>
      </Flex>
    </Container>
  );
};
