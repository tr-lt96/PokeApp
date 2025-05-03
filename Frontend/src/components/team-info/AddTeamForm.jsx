import { useForm } from "@mantine/form";
import { Button, Flex, TextInput } from "@mantine/core";
import { themeColor } from "../../constants";
import { addNewTeam } from "../../functions/team";
import { useUser } from "../auth/context/AuthContext";
import { useMessage } from "../shared/core";

export const AddTeamForm = ({ handleCloseModal }) => {
  const { addTeam: addTeamToContext } = useUser();
  const { setUserAlert } = useMessage();
  const newTeamForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      teamName: "",
    },

    validate: {
      teamName: (value) =>
        /^[a-zA-Z0-9_.-]*$/.test(value)
          ? null
          : "Invalid teamname, must have only non-spacing character and _,.,-",
    },
  });

  const handleSubmit = (values) => {
    addNewTeam(values.teamName)
      .then((result) => {
        if (result) {
          addTeamToContext({
            name: result.name,
            teamId: result.teamId,
            pokemons: [],
          });
          handleCloseModal();
        } else {
          setUserAlert("Oopsies, error while creating new team", "error");
        }
      })
      .catch((error) => {
        console.error(error);
        setUserAlert("Oopsies, error while creating new team", "error");
      });
  };

  return (
    <form onSubmit={newTeamForm.onSubmit(handleSubmit)}>
      <Flex direction={"column"} gap={"sm"}>
        <TextInput
          required
          radius={"md"}
          variant={"filled"}
          label={"Team's name"}
          description={"Warning: can't change team name once set. How sad!"}
          placeholder="Team Rocket"
          {...newTeamForm.getInputProps("teamName")}
        />
        <Button
          color={themeColor.primary}
          type="submit"
          fullWidth
          radius={"md"}
          my={"md"}
        >
          Create team
        </Button>
      </Flex>
    </form>
  );
};
