import { PasswordInput, Button, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { themeColor } from "../../../constants";
import { updateUserPassword } from "../../../functions/auth";
import { useMessage } from "../../shared/core";

export const ResetPasswordForm = () => {
  const { setUserAlert } = useMessage();
  const registerForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      password: (value) => {
        if (value.length < 8) {
          return "Password cannot be less than 8 characters.";
        }
        if (!/[A-Z]/.test(value)) {
          return "Where's the uppercase letter?";
        }
        if (!/[0-9]/.test(value)) {
          return "A number, please";
        }
        if (!/[!@#$%^&*,.?]/.test(value)) {
          return "Special character does need to be special - or are you trying to break our system?";
        }
      },
    },
  });

  const handleSubmit = (values) => {
    if (values.confirmPassword !== values.password) {
      registerForm.setFieldError(
        "confirmPassword",
        "Doesn't match above password. Are you sure that you can remember this password?"
      );
      return;
    }

    updateUserPassword({
      currentPassword: values.currentPassword,
      newPassword: values.password,
      confirmNewPassword: values.confirmPassword,
    }).then((result) => {
      if (result) {
        setUserAlert(`Successful update your password.`, "success");
      } else {
        setUserAlert("Oops, we messed up, can you try again?", "error");
      }
    });
  };

  return (
    <form onSubmit={registerForm.onSubmit(handleSubmit)}>
      <Flex direction={"column"} gap={"sm"}>
        <PasswordInput
          required
          size="sm"
          variant={"filled"}
          label={"Current Password"}
          description={"Your ol' password - hope that you still remember it"}
          placeholder="********"
          {...registerForm.getInputProps("currentPassword")}
        />
        <PasswordInput
          required
          size="sm"
          variant={"filled"}
          label={"New Password"}
          description={
            "Must have at least a capital character, a number and a special character (e.g. @, #)"
          }
          placeholder="********"
          {...registerForm.getInputProps("password")}
        />

        <PasswordInput
          required
          size="sm"
          variant={"filled"}
          label={"Confirm your password"}
          description={"Re-enter your password"}
          placeholder="********"
          {...registerForm.getInputProps("confirmPassword")}
        />

        <Flex justify={"flex-end"}>
          <Button
            color={themeColor.primary}
            type="submit"
            radius={"md"}
            my={"md"}
          >
            Update password
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
