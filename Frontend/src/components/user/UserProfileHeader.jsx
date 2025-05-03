import { Avatar, Flex } from "@mantine/core";
import { Text } from "../shared/core";
import { useMemo } from "react";
import { generateUserProfileColor } from "./get-user-profile-color";

const GeneratedAvatar = ({ username, profileColor }) => {
  const initLetter = username[0];
  return (
    <Avatar variant={"filled"} color={profileColor}>
      {initLetter}
    </Avatar>
  );
};

export const UserProfileHeader = ({ username = "Unown" }) => {
  const profileColor = useMemo(() => generateUserProfileColor(username), []);

  return (
    <Flex align={"center"} gap={"md"}>
      <GeneratedAvatar profileColor={profileColor} username={username} />
      <Text variant={"heading-lg-strong"}>{username}</Text>
    </Flex>
  );
};
