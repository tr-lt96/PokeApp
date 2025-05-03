import {
  Anchor,
  Badge,
  Card,
  Flex,
  Image,
  useMantineTheme,
} from "@mantine/core";
import { Text } from "../shared/core";
import { Link, useLocation } from "react-router";
import {
  IconCirclesFilled,
  IconSearch,
  IconUserFilled,
} from "@tabler/icons-react";
import { themeColor } from "../../constants";
import { getMantineThemeTokenFromColor } from "../../functions/style";
import { useUser } from "../auth/context/AuthContext";
import logoText from "../../assets/logo-text.png";

const NavigationLink = ({ href, label, Icon }) => {
  const theme = useMantineTheme();
  const location = useLocation();

  const isActive = location.pathname.startsWith(href);
  const linkText = isActive
    ? getMantineThemeTokenFromColor(themeColor.primary, theme)
    : getMantineThemeTokenFromColor(themeColor.neutral, theme);

  return (
    <>
      <Anchor component={Link} to={href} visibleFrom="xs" underline="never">
        <Badge
          bg={"transparent"}
          p={"sm"}
          radius={"sm"}
          style={{ cursor: "pointer" }}
        >
          <Text variant="label-md-strong" c={linkText}>
            {label}
          </Text>
        </Badge>
      </Anchor>
      <Anchor component={Link} to={href} hiddenFrom="xs" underline="never">
        <Badge bg={"transparent"} px={"xs"} py={"sm"} radius={"sm"}>
          <Icon color={linkText} stroke={3} size={20} />
        </Badge>
      </Anchor>
    </>
  );
};
export const NavigationBar = () => {
  const { isAuth } = useUser();

  if (!isAuth) {
    return null;
  }

  return (
    <Card mb="lg">
      <Flex justify={"space-between"}>
        <Image src={logoText} h={24}></Image>
        <Flex gap={"xs"}>
          <NavigationLink
            href={"/pokemon/search"}
            label={"Search"}
            Icon={IconSearch}
          />
          <NavigationLink
            href={"/team"}
            label={"Teams"}
            Icon={IconCirclesFilled}
          />
          <NavigationLink href={"/user"} label={"User"} Icon={IconUserFilled} />
        </Flex>
      </Flex>
    </Card>
  );
};
