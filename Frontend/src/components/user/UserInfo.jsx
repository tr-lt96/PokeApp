import { ResetPasswordForm } from "../auth/reset-password/ResetPasswordForm";
import { Card, Divider, Flex, TextInput, useMatches } from "@mantine/core";
import { Text } from "../shared/core";
import { UserProfileHeader } from "./UserProfileHeader";
import { useUser } from "../auth/context/AuthContext";
import { LogoutButton } from "./LogoutButton";

const mediaResponsiveSize = {
  base: `100%`,
  sm: `calc(${100 / 2}% - 12px)`,
};

export const UserInfo = () => {
  const { username = "unown", email } = useUser();
  const inputWidth = useMatches(mediaResponsiveSize);

  return (
    <Card maw={500}>
      <Flex direction={"column"} gap={"md"}>
        <UserProfileHeader username={username} />
        <Divider />
        <div>
          <Text variant="heading-md-strong">Account information</Text>
          <Flex gap={"md"} wrap={"wrap"}>
            <TextInput
              radius={"md"}
              variant={"filled"}
              label={"Username"}
              description={"Your name as a trainer"}
              value={username}
              w={inputWidth}
              readOnly
            />
            <TextInput
              radius={"md"}
              variant={"filled"}
              label={"Email"}
              description={"Your email for spams"}
              value={email}
              w={inputWidth}
              readOnly
            />
          </Flex>
        </div>
        <Divider />
        <div>
          <Text variant="heading-md-strong">Change password</Text>
          <ResetPasswordForm />
        </div>
        <Divider />
        <div>
          <Flex justify={"space-between"} align={"center"}>
            <Text variant="heading-md-strong">Click here to log out</Text>
            <LogoutButton />
          </Flex>
        </div>
      </Flex>
    </Card>
  );
};
