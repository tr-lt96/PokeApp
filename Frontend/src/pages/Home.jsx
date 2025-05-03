import { useNavigate } from "react-router";
import { useUser } from "../components/auth/context/AuthContext";
import { useEffect } from "react";

export const HomePage = () => {
  const { isAuth } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } else {
      navigate("/pokemon/search");
    }
  }, []);

  return <div></div>;
};
