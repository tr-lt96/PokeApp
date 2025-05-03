import { TOKEN_KEY } from "../constants";

export const getUser = async () => {
  if (import.meta.env.VITE_ENV === "local") {
    return {
      username: "Ash-ketchum",
      email: "ash@kanto.town",
    };
  }

  try {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const endpoint = `${import.meta.env.VITE_API_ENDPOINT}/auth/userInformation`;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetch(endpoint, {
      method: "GET",
      headers,
    });

    if (!fetchResult?.ok) {
      return null;
    }

    const userData = await fetchResult.json();

    if (!userData) {
      return null;
    }

    return {
      username: userData.user.username,
      email: userData.user.email,
      teams: userData.teams.map((team) => {
        return {
          name: team.name,
          teamId: team["_id"],
          pokemons: team.pokemons || [],
        };
      }),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
