import { Image } from "@mantine/core";
import styleClasses from "./styles.module.css";
import { Link } from "react-router";
import { RegisterForm } from "../../components/auth/register/RegisterForm";
import logo from "../../assets/logo.jpg";
import { themeColor } from "../../constants";
import { Text } from "../../components/shared/core";

const FormHeader = () => {
  return (
    <div className={styleClasses["form-header"]}>
      <Image src={logo} radius={"md"} w={150} mb={"sm"}></Image>
      <Text variant="heading-md-strong">Create your trainer account</Text>
      <Text size="sm">Join the world of Pokemon</Text>
    </div>
  );
};

const LoginLink = () => {
  return (
    <span className={styleClasses["auth-link"]}>
      <Text size="sm">Already one of us?</Text>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Text size="sm" c={themeColor.primary} fw={700}>
          Login
        </Text>
      </Link>
    </span>
  );
};

export const RegisterPage = () => {
  return (
    <>
      <FormHeader />
      <RegisterForm />
      <LoginLink />
    </>
  );
};
