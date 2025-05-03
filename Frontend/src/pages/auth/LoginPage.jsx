import { Image } from "@mantine/core";
import styleClasses from "./styles.module.css";
import { LoginForm } from "../../components/auth/login/LoginForm";
import { Link } from "react-router";
import logo from "../../assets/logo.jpg";
import { themeColor } from "../../constants";
import { Text } from "../../components/shared/core";

const FormHeader = () => {
  return (
    <div className={styleClasses["form-header"]}>
      <Image src={logo} radius={"md"} w={150} mb={"sm"}></Image>
      <Text variant="heading-md-strong">Pokemon trainer login</Text>
      <Text size="sm">Log in to build your dream team</Text>
    </div>
  );
};

const RegisterLink = () => {
  return (
    <span className={styleClasses["auth-link"]}>
      <Text size="sm">New trainer?</Text>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Text size="sm" c={themeColor.primary} fw={700}>
          Register here.
        </Text>
      </Link>
    </span>
  );
};

export const LoginPage = () => {
  return (
    <>
      <FormHeader />
      <LoginForm />
      <RegisterLink />
    </>
  );
};
