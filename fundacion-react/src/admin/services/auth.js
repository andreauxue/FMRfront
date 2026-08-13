// src/services/auth.js

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

export async function loginRequest(email, password) {
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Credenciales incorrectas"
    );
  }

  return data;
}

export async function getMeRequest() {
  const response = await fetch(
    `${API_URL}/auth/me`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      "No se pudo comprobar la sesión"
    );
  }

  return response.json();
}

export async function logoutRequest() {
  const csrfToken = getCsrfToken();

  const response = await fetch(
    `${API_URL}/auth/logout`,
    {
      method: "POST",
      credentials: "include",

      headers: {
        "X-CSRF-Token": csrfToken,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "No se pudo cerrar la sesión"
    );
  }
}

function getCsrfToken() {
  const cookie = document.cookie
    .split("; ")
    .find((row) =>
      row.startsWith("csrf_token=")
    );

  if (!cookie) {
    return "";
  }

  return decodeURIComponent(
    cookie.substring(
      "csrf_token=".length
    )
  );
}