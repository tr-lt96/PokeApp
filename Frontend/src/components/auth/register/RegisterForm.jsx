import { TextInput, PasswordInput, Button, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { themeColor } from "../../../constants";
import { registerUser } from "../../../functions/auth";
import { useMessage } from "../../shared/core";
import { useNavigate } from "react-router";

export const RegisterForm = () => {
  const { setUserAlert } = useMessage();
  const navigate = useNavigate();

  const registerForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      username: (value) =>
        /^[a-zA-Z0-9_.-]*$/.test(value)
          ? null
          : "Invalid username, must have only non-spacing character and _,.,-",
      email: (value) =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]+$/.test(value) ? null : "Invalid email",
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
    if (!values) {
      return;
    }

    if (values.confirmPassword !== values.password) {
      registerForm.setFieldError(
        "confirmPassword",
        "Doesn't match above password. Are you sure that you can remember this password?"
      );
      return;
    }

    registerUser({
      username: values.username,
      email: values.email,
      password: values.password,
    }).then((result) => {
      if (!result) {
        setUserAlert(
          "Awrr, we want to welcome you in, but it seems like our system have trouble registering you. Have you registered with us before?",
          "error"
        );
      } else {
        setUserAlert(
          `Successful registering yourself with these credentials, we just need to make sure you remember these credentials (definitely not a test)`,
          "success"
        );
        navigate("/login");
      }
    });
  };

  return (
    <form onSubmit={registerForm.onSubmit(handleSubmit)}>
      <Flex direction={"column"} gap={"sm"}>
        <TextInput
          required
          variant={"filled"}
          label={"Trainer's name"}
          placeholder="Your name"
          description={'Characters, numbers and ".", "_", "-" only'}
          {...registerForm.getInputProps("username")}
        />

        <TextInput
          required
          variant={"filled"}
          label={"Email"}
          description={"Enter your email"}
          placeholder="Your email"
          {...registerForm.getInputProps("email")}
        />

        <PasswordInput
          required
          size="sm"
          variant={"filled"}
          label={"Password"}
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

        <Button
          color={themeColor.primary}
          type="submit"
          fullWidth
          radius={"md"}
          my={"md"}
        >
          Register
        </Button>
      </Flex>
    </form>
  );
};
