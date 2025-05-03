import { Button } from "@mantine/core";
import { logoutUser } from "../../functions/auth";
import { useMessage } from "../shared/core";
import { useUser } from "../auth/context/AuthContext";
import { TOKEN_KEY } from "../../constants";

export const LogoutButton = () => {
  const { setUserAlert } = useMessage();
  const { resetUserContext } = useUser();
  const handleLogout = () => {
    logoutUser()
      .then((result) => {
        if (!result) {
          setUserAlert("Oops, looks like we don't want you to go", "error");
        } else {
          resetUserContext();
          setUserAlert("Bye bye", "success");
          window.localStorage.removeItem(TOKEN_KEY);
        }
      })
      .catch((error) => {
        setUserAlert("Oops, looks like we don't want you to go", "error");
      });
  };
  return (
    <Button
      color={"red"}
      variant={"light"}
      radius={"md"}
      my={"md"}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
