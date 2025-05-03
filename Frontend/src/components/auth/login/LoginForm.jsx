import { TextInput, PasswordInput, Button, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMessage } from "../../shared/core";
import { themeColor, TOKEN_KEY } from "../../../constants";
import { loginUser } from "../../../functions/auth";
import { useUser } from "../context/AuthContext";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const { setUserAlert } = useMessage();
  const { resetUserContext } = useUser();
  const navigate = useNavigate();
  const loginForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) => {
        if (value.includes("@")) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]+$/.test(value)
            ? null
            : "Invalid email";
        } else {
          return /^[a-zA-Z0-9_.-]*$/.test(value) ? null : "Invalid username";
        }
      },
    },
  });

  const handleSubmit = (values) => {
    if (!values) {
      return;
    }

    loginUser({ username: values.username, password: values.password }).then(
      (result) => {
        if (!result) {
          setUserAlert(
            "Awrr, can't log you in with these credentials. Have you registered with us?",
            "error"
          );
        } else {
          const { token } = result;
          if (token) {
            window.localStorage.setItem(TOKEN_KEY, token);
            setUserAlert(`Welcome, trainer ${values.username} 👋`, "success");
            resetUserContext().then((isAuth) => {
              if (isAuth) {
                navigate("/pokemon/search");
              } else {
                setUserAlert("Whoopsie, can you refresh the page?", "error");
              }
            });
          } else {
            setUserAlert(
              "We gave you a broken token, can you try logging in again?",
              "error"
            );
            console.error("Auth token is broken");
          }
        }
      }
    );
  };

  return (
    <form onSubmit={loginForm.onSubmit(handleSubmit)}>
      <Flex direction={"column"} gap={"sm"}>
        <TextInput
          required
          radius={"md"}
          variant={"filled"}
          label={"Trainer's name"}
          description={"Enter your username or email"}
          placeholder="Username or email"
          {...loginForm.getInputProps("username")}
        />
        <PasswordInput
          required
          radius={"md"}
          variant={"filled"}
          label={"Password"}
          description={"Enter password"}
          placeholder="********"
          {...loginForm.getInputProps("password")}
        />

        {/* <Flex justify={"space-between"} w={"100%"} mt={"md"}>
          <Checkbox
            defaultChecked
            label="Remember me"
            {...loginForm.getInputProps("rememberMe")}
          />

          <Link style={{ textDecoration: "none" }}>
            <Text variant={"label-md-strong"} td="none" c="blue">
              Forgot password?
            </Text>
          </Link>
        </Flex> */}

        <Button
          color={themeColor.primary}
          type="submit"
          fullWidth
          radius={"md"}
          my={"md"}
        >
          Log in
        </Button>
      </Flex>
    </form>
  );
};
