import { Affix, Alert } from "@mantine/core";
import { useMessage } from "./MessageContext";
import {
  IconMoodConfuzedFilled,
  IconMoodSmileFilled,
  IconMoodWrrrFilled,
} from "@tabler/icons-react";

const ALERT_PROPS_BY_SEVERITY = {
  //variant="light" color="blue" title="Alert title" icon={icon}

  success: {
    color: "green",
    title: "Success",
    icon: <IconMoodSmileFilled size={24} />,
  },
  warning: {
    color: "yellow",
    title: "Warning",
    icon: <IconMoodConfuzedFilled size={24} />,
  },
  error: {
    color: "red",
    title: "Error",
    icon: <IconMoodWrrrFilled size={24} />,
  },
};
export const Message = () => {
  const { message, severity = "warning" } = useMessage();

  if (!message) {
    return null;
  }

  return (
    <Affix position={{ bottom: "sm", right: "sm" }} maw={300}>
      <Alert variant={"filled"} {...ALERT_PROPS_BY_SEVERITY[severity]}>
        {message}
      </Alert>
    </Affix>
  );
};
