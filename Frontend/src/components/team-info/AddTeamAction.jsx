import { Button, Modal } from "@mantine/core";
import { AddTeamForm } from "./AddTeamForm";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { themeColor } from "../../constants";
import { Text } from "../shared/core";

const AddButtonIcon = () => {
  return <IconPlus stroke={2} size={16} />;
};
export const AddTeamAction = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        leftSection={<AddButtonIcon />}
        radius={"md"}
        onClick={open}
        color={themeColor.primary}
        size={"sm"}
      >
        Not enough team?
      </Button>
      <Modal
        title={<Text variant="heading-md-strong">Create a new team</Text>}
        opened={opened}
        onClose={close}
        withCloseButton
      >
        <AddTeamForm handleCloseModal={() => close()} />
      </Modal>
    </>
  );
};
