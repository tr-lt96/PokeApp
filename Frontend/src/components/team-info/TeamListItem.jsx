import { Flex, Card, useMatches, Button, ActionIcon } from "@mantine/core";
import { TeamMemberSpriteDisplay } from "../shared/team";
import { Text, useMessage } from "../shared/core";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { themeColor } from "../../constants";
import { deleteTeam } from "../../functions/team";
import { useUser } from "../auth/context/AuthContext";

const mediaResponsiveSize = {
  base: `calc(${100 / 2}% - 12px)`,
  xs: `calc(${100 / 3}% - 12px)`,
  sm: `calc(${100 / 6}% - 12px)`,
};

const ViewIcon = () => {
  return <IconEye size={16} />;
};
const DeleteIcon = () => {
  return <IconTrash size={16} />;
};

export const TeamListItem = ({ team = {} }) => {
  const { name = "Unown", pokemons = [], teamId } = team;
  const itemWidth = useMatches(mediaResponsiveSize);
  const navigate = useNavigate();
  const { setUserAlert } = useMessage();
  const { deleteTeam: deleteTeamFromContext } = useUser();

  const handleView = () => {
    navigate(`/team/${teamId}`);
  };

  const handleRemove = async () => {
    deleteTeam(teamId).then((result) => {
      if (result) {
        setUserAlert(`Bye team ${name} 👋`, "success");
        deleteTeamFromContext(teamId);
      } else {
        setUserAlert(
          "Trouble removing team, team doesn't want to leave you :(",
          "error"
        );
      }
    });
  };

  return (
    <Card>
      <Flex align={"center"} mb={"md"} gap={"xs"} justify={"space-between"}>
        <Text variant="label-lg-strong">{name}</Text>
        <Flex gap="md" visibleFrom="xs">
          <Button
            size="xs"
            variant="light"
            color="red"
            leftSection={<DeleteIcon />}
            onClick={handleRemove}
          >
            Delete
          </Button>
          <Button
            size="xs"
            variant="light"
            leftSection={<ViewIcon />}
            onClick={handleView}
            color={themeColor.primary}
          >
            View analysis
          </Button>
        </Flex>
        <Flex gap="md" hiddenFrom="xs">
          <ActionIcon color="red" variant="light" hiddenFrom="xs">
            <DeleteIcon />
          </ActionIcon>
          <ActionIcon
            variant="light"
            hiddenFrom="xs"
            color={themeColor.primary}
          >
            <ViewIcon />
          </ActionIcon>
        </Flex>
      </Flex>
      <Flex justify={"start"} gap={"sm"} wrap={"wrap"}>
        {pokemons.map((pokemon, index) => (
          <TeamMemberSpriteDisplay
            key={`${name}-pokemon-${index}`}
            pokemon={pokemon}
            teamName={name}
            w={mediaResponsiveSize}
          />
        ))}
      </Flex>
    </Card>
  );
};
