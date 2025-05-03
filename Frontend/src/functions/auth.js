import { TOKEN_KEY } from "../constants";

export const loginUser = async ({ username, password }) => {
  if (import.meta.env.VITE_ENV === "local") {
    return {
      token: "test-token",
    };
  }

  try {
    const endpoint = `${import.meta.env.VITE_API_ENDPOINT}/auth/login`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        usernameOrEmail: username,
        password,
      }),
    });

    if (!fetchResult?.ok) {
      throw new Error("Issue while logging in");
    }

    const result = await fetchResult?.json();

    if (!result?.token) {
      throw new Error("Issue while logging in");
    }

    return {
      token: result.token,
    };
  } catch (error) {
    console.error(`${error}`);
    return null;
  }
};

export const registerUser = async ({ username, email, password }) => {
  if (import.meta.env.VITE_ENV === "local") {
    return true;
  }

  try {
    const endpoint = `${import.meta.env.VITE_API_ENDPOINT}/auth/register`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers,
    });

    if (fetchResult?.status !== 201) {
      throw new Error("Issue while registering");
    }

    const result = await fetchResult?.json();

    if (!result || result.error) {
      throw new Error(result.error);
    }

    return true;
  } catch (error) {
    console.error(`${error}`);
    return null;
  }
};

export const updateUserPassword = async ({
  currentPassword,
  newPassword,
  confirmNewPassword,
}) => {
  if (import.meta.env.VITE_ENV === "local") {
    return true;
  }

  try {
    const endpoint = `${import.meta.env.VITE_API_ENDPOINT}/auth/change-password`;
    const token = window.localStorage.getItem(TOKEN_KEY) || "";
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmNewPassword,
      }),
      headers,
    });

    if (!fetchResult?.ok) {
      throw new Error("Issue while updating password");
    }

    const result = await fetchResult?.json();

    if (!result || result.error) {
      throw new Error(result.error);
    }

    return true;
  } catch (error) {
    console.error(`${error}`);
    return null;
  }
};

export const logoutUser = async () => {
  if (import.meta.env.VITE_ENV === "local") {
    return true;
  }

  try {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const endpoint = `${import.meta.env.VITE_API_ENDPOINT}/auth/logout`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const fetchResult = await fetch(endpoint, {
      method: "POST",
      headers,
    });

    if (!fetchResult?.ok) {
      throw new Error("Issue while logging out");
    }

    const result = await fetchResult?.json();

    if (!result || result.error) {
      throw new Error("Issue while logging out");
    }

    return true;
  } catch (error) {
    console.error(`${error}`);
    return false;
  }
};
