import styleClasses from "./styles.module.css";
import { Outlet } from "react-router";
import { Card } from "@mantine/core";
import { useNavigate } from "react-router";
import { useUser } from "../../components/auth/context/AuthContext";
import { useEffect } from "react";

export const AuthLayout = ({ children }) => {
  const { isAuth } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/pokemon/search");
    }
  }, []);

  return (
    <div className={styleClasses["layout-container"]}>
      <Card shadow="md" radius={"md"} className={styleClasses["form-card"]}>
        <Outlet />
      </Card>
    </div>
  );
};
