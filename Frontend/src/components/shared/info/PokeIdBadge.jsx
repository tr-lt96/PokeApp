import { Badge } from "@mantine/core";

const getDisplayPokeId = (pokeId) => {
  if (pokeId > 100) {
    return `#${pokeId}`;
  }

  if (pokeId > 10) {
    return `#0${pokeId}`;
  }

  return `#00${pokeId}`;
};

export const PokeIdBadge = ({ pokeId, ...badgeProps }) => {
  const displayPokeId = getDisplayPokeId(pokeId);

  return (
    <Badge color={"dark"} variant={"light"} {...badgeProps}>
      {displayPokeId}
    </Badge>
  );
};
