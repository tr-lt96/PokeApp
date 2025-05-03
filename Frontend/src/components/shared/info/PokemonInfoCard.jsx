import { Anchor, Card, Flex, Image, useMatches } from "@mantine/core";
import { Text } from "../core";
import { TypeInfo, PokeIdBadge } from ".";
import { getPokemonDisplayName } from "../../../functions/utils";
import { Link } from "react-router";

const mediaResponsiveSize = {
  base: `calc(100% - 12px)`,
  xs: `calc(${100 / 2}% - 12px)`,
  sm: `calc(${100 / 3}% - 12px)`,
};

/**
 * @typedef {{
 * name: string,
 * pokeId: number,
 * spriteUrl: string,
 * types: string[],
 * }} IPokemonInfoCard
 *
 * @param {IPokemonInfoCard} props
 */
export const PokemonInfoCard = ({
  name,
  pokeId,
  spriteUrl,
  types = [],
  resultId,
}) => {
  const itemWidth = useMatches(mediaResponsiveSize);
  const displayName = getPokemonDisplayName(name);

  return (
    <Anchor
      component={Link}
      to={`/pokemon/${name}`}
      w={itemWidth}
      underline={"never"}
    >
      <Card radius={"md"} shadow={"md"} w={"100%"} h={"100%"} py={"xs"}>
        <Flex direction={"row-reverse"} w={"100%"}>
          <PokeIdBadge pokeId={pokeId} />
        </Flex>
        <Flex justify={"center"}>
          <Image src={spriteUrl} miw={80} maw={200} alt={`${name}-sprite`} />
        </Flex>
        <Text variant={"label-lg-strong"}>{displayName}</Text>
        <TypeInfo types={types} keyID={resultId} size="md" />
      </Card>
    </Anchor>
  );
};
