import { Badge, Card, Container, Flex, Progress, Image } from "@mantine/core";
import { Text } from "../shared/core";
import { themeColor } from "../../constants";
import { TypeInfo } from "../shared/info";

export const PokemonTypeInfoCard = ({ types }) => {
  return (
    <Card radius={"md"} w={"100%"} shadow={"md"}>
      <Text variant="label-sm-strong" mb={"xs"}>
        Type
      </Text>
      <TypeInfo types={types} keyID={"pokemon"} size={"md"} wrap />
    </Card>
  );
};

export const PokemonSizeInfoCard = ({ height, weight }) => {
  const displayInfo = `${height / 10}m / ${weight / 10}kg`;

  return (
    <Card radius={"md"} w={"100%"} shadow={"md"}>
      <Text variant="label-sm-strong" mb={"xs"}>
        Height/Weight
      </Text>
      <Text>{displayInfo}</Text>
    </Card>
  );
};

export const PokemonAbilitesInfoCard = ({ abilities }) => {
  if (!abilities?.length) {
    return null;
  }

  return (
    <Card radius={"md"} w={"100%"} shadow={"md"}>
      <Text variant="label-sm-strong" mb={"xs"}>
        Abilities
      </Text>
      <Flex gap={6} wrap={"wrap"}>
        {abilities.map((ability, index) => (
          <Badge
            key={`pokemon-${index}-${ability}`}
            color={themeColor.primary}
            size="sm"
            radius={"sm"}
          >
            {ability}
          </Badge>
        ))}
      </Flex>
    </Card>
  );
};

const STAT_LABEL_MAP = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  specialAttack: "Sp. Attack",
  specialDefense: "Sp. Defense",
  speed: "Speed",
};

const STAT_COLOR_MAP = {
  hp: "green.4",
  attack: "yellow.4",
  defense: "orange.5",
  specialAttack: "cyan.4",
  specialDefense: "indigo.4",
  speed: "pink.4",
};

const StatDisplay = ({ label, value = 0 }) => {
  const displayLabel = STAT_LABEL_MAP[label] || label;
  const progressValue = (value / 255) * 100;
  return (
    <Container w={"100%"} p={0}>
      <Flex justify={"space-between"}>
        <Text variant={"label-md"} mb={4}>
          {displayLabel}
        </Text>
        <Text>{value}</Text>
      </Flex>
      <Progress
        color={STAT_COLOR_MAP[label]}
        size={"lg"}
        value={progressValue}
      />
    </Container>
  );
};

export const PokemonStatsInfoCard = ({ stats }) => {
  if (!stats) {
    return null;
  }
  return (
    <Card radius={"md"} w={"100%"} shadow={"md"}>
      <Text variant="label-sm-strong" mb={"xs"}>
        Base stats
      </Text>
      <Flex direction={"column"} rowGap={6}>
        {Object.keys(stats).map((stat, index) => (
          <StatDisplay
            key={`${stat}-${index}`}
            label={stat}
            value={stats[stat]}
          />
        ))}
      </Flex>
    </Card>
  );
};

export const PokemonSpriteDisplay = ({ spriteUrl }) => {
  return (
    <Card radius={"md"} w={"100%"} h={"100%"} shadow={"md"}>
      <Flex justify={"center"} w={"100%"} h={"100%"} align={"center"}>
        {spriteUrl && <Image src={spriteUrl} h={250} />}
      </Flex>
    </Card>
  );
};
