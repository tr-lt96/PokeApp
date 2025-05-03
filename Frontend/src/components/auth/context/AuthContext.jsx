import { createContext, useContext, useState } from "react";
import { getUser } from "../../../functions/user";
import { useLocation, useNavigate } from "react-router";
import { getAllTeams } from "../../../functions/team";

const initUser = {
  username: "",
  email: "",
  teams: [],
  isAuth: false,
  addTeam: (team) => {},
  updateTeam: (team) => {},
  deleteTeam: (teamId) => {},
  resetUserContext: () => {},
};

const UserContext = createContext(initUser);

export const UserProvider = ({ children }) => {
  const [teams, setTeams] = useState();
  const [user, setUser] = useState({
    isAuth: false,
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const setupUserContext = async () => {
    setLoading(true);

    const userData = await getUser();

    if (!userData) {
      setLoading(false);
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login");
      }
      return false;
    }

    setUser({
      isAuth: true,
      username: userData.username,
      email: userData.email,
    });

    const teamsData = await getAllTeams();

    if (teamsData) {
      setTeams(teamsData);
    }

    setLoading(false);
    return true;
  };

  const addTeam = (team) => {
    if (
      !team ||
      !teams ||
      teams.some((currentTeam) => currentTeam.teamId === team.teamId)
    ) {
      return;
    }

    setTeams([...teams, team]);
  };

  const updateTeam = (team) => {
    if (!team || !teams) {
      return;
    }

    const currentTeam = [...teams];

    currentTeam.forEach((currentTeam) => {
      if (currentTeam.teamId === team.teamId) {
        currentTeam.pokemons = team.pokemons;
      }
    });

    setTeams(currentTeam);
  };

  const deleteTeam = (teamId) => {
    if (!teamId || !teams) {
      return;
    }

    const currentTeam = [...teams];

    let deleteIndex = -1;
    currentTeam.forEach((currentTeam, index) => {
      if (currentTeam.teamId === teamId) {
        deleteIndex = index;
      }
    });

    if (deleteIndex >= 0) {
      currentTeam.splice(deleteIndex, 1);
    }

    setTeams(currentTeam);
  };

  useState(() => {
    setupUserContext();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <UserContext.Provider
      value={{
        teams: teams || [],
        username: user?.username,
        email: user?.email,
        isAuth: user?.isAuth,
        addTeam,
        updateTeam,
        deleteTeam,
        resetUserContext: setupUserContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
