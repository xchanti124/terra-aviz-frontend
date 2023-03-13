import jwtDecode from "jwt-decode";

const apiUrl = "http://localhost:3000/api";

// Function used to authenticate a user by their email and password.
// If successful, will put both auth and refresh tokens into the local storage.
// If unsuccessful, will throw an error.
const authenticate = async (email, password) => {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const responseJson = await response.json();

  if ("errors" in responseJson) {
    throw new Error(responseJson.errors[0]);
  }

  localStorage.setItem("authToken", responseJson.authToken);
  localStorage.setItem("refreshToken", responseJson.refreshToken);
};

const isAuthenticated = () => {
  const localStorageAuthToken = localStorage.getItem("authToken");
  const localStorageRefreshToken = localStorage.getItem("refreshToken");

  if (!localStorageAuthToken || !localStorageRefreshToken) {
    return false;
  }

  try {
    const parsedAuth = jwtDecode(localStorageAuthToken);
    const parsedRefresh = jwtDecode(localStorageRefreshToken);
    const currentTime = Math.floor(Date.now() / 1000) + 30;

    return !(currentTime > parsedAuth.exp && currentTime > parsedRefresh.exp);
  } catch (e) {
    return false;
  }
};

const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
};

// Function that ensures that the tokens in local storage (if any) are refreshed.
// If auth token and refresh tokens don't exist in the local storage, does nothing. (User is unauthenticated)
// If the auth token and refresh tokens exist and both haven't expired, does nothing. (User is authenticated)
// If the auth token exists, but has expired, and the refresh token that hasn't expired exists,
// then it will refresh both tokens. (User is authenticated)
// If both the auth and refresh tokens exist, but have expired, will remove them from local storage. (User is unauthenticated)
// If both the auth and refresh tokens exist, but are invalid JWT tokens, will remove them from local storage.
// (user is unauthenticated)
const ensureTokens = async () => {
  const localStorageAuthToken = localStorage.getItem("authToken");
  const localStorageRefreshToken = localStorage.getItem("refreshToken");

  if (localStorageAuthToken && localStorageRefreshToken) {
    try {
      const parsedAuth = jwtDecode(localStorageAuthToken);
      const parsedRefresh = jwtDecode(localStorageRefreshToken);

      // Let's consider tokens that are 30 seconds away from being expired as alaready expired,
      // to avoid situations where the token expires inbetween sending the request and receiving
      // the response.
      const currentTime = Math.floor(Date.now() / 1000) + 30;

      // If auth token has expired but the refresh token is still active
      if (currentTime > parsedAuth.exp && currentTime <= parsedRefresh.exp) {
        const response = await fetch(`${apiUrl}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: localStorageRefreshToken,
          }),
        });
        const responseJson = await response.json();

        localStorage.setItem("authToken", responseJson.authToken);
        localStorage.setItem("refreshToken", responseJson.refreshToken);
      }

      // If both auth and refresh tokens have expired
      if (currentTime > parsedAuth.exp && currentTime > parsedRefresh.exp) {
        logout();
      }
    } catch {
      // If refresh or auth tokens are malformed (jwtDecode will throw)
      logout();
    }
  }
};

// Will send a normal fetch but attach the active auth token to the Authorization header.
// If the auth token has expired, will first refresh the auth token and THEN send the needed fetch request.
// This could be used for both authenticated and unauthenticated contexts. If no auth token currently exists,
// this function will simply not attach the auth header (functionally identical to normal fetch).
// This function should be used in place of normal fetch calls, because it abstracts the complications
// of keeping up with the up-to-date auth token.
const authenticatedFetch = async (url, options) => {
  await ensureTokens();

  const authToken = localStorage.getItem("authToken");
  const headers = options?.headers ?? {};
  const finalHeaders = authToken
    ? {
        ...headers,
        Authorization: `Bearer ${authToken}`,
      }
    : headers;

  return await fetch(url, { ...options, headers: finalHeaders });
};

const register = async (username, email, password, repeatPassword) => {
  try {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        repeatPassword,
      }),
    });
    const responseJson = await response.json();

    if ("validationErrors" in responseJson) {
      throw new Error(responseJson.validationErrors[0].msg);
    }

    if ("errors" in responseJson) {
      throw new Error(responseJson.errors[0]);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

export { authenticate, isAuthenticated, register, logout, authenticatedFetch, apiUrl };

