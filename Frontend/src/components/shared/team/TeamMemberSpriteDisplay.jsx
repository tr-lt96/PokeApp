import { Container, Flex, Image } from "@mantine/core";
import { Text } from "../core";
import { TypeInfo } from "../info";
import { getPokemonDisplayName } from "../../../functions/utils";

export const TeamMemberSpriteDisplay = ({
  pokemon,
  teamName,
  ...containerProps
}) => {
  const { name = "Unown", spriteUrl, types } = pokemon;
  const displayName = getPokemonDisplayName(name);
  const typeKeyID = teamName.split(" ").join("-");

  return (
    <Container p={0} m={0} {...containerProps}>
      <Flex direction={"column"} justify={"center"} align={"center"} gap={4}>
        <Image src={spriteUrl} w={50} />
        <Text variant={"label-sm"}>{displayName}</Text>
        <TypeInfo
          types={types}
          keyID={typeKeyID}
          size={"sm"}
          wrap
          style={{ justifyContent: "center" }}
        />
      </Flex>
    </Container>
  );
};
