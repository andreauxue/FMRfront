// src/admin/services/medicines.js

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:3000";

async function parseResponse(response) {
  const data = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `La solicitud falló con código ${response.status}`
    );
  }

  return data;
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

// ─────────────────────────────────────────────
// PÚBLICO
// ─────────────────────────────────────────────

export async function getMedicinesRequest() {
  const response = await fetch(
    `${API_URL}/medicines`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return parseResponse(response);
}

export async function getMedicineRequest(id) {
  const response = await fetch(
    `${API_URL}/medicines/${id}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return parseResponse(response);
}

// ─────────────────────────────────────────────
// ADMIN
// ─────────────────────────────────────────────

export async function createMedicineRequest(values) {
  const csrfToken = getCsrfToken();

  const response = await fetch(
    `${API_URL}/medicines`,
    {
      method: "POST",

      credentials: "include",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },

      body: JSON.stringify({
        articleCode: values.articleCode,
        name: values.name,
        description:
          values.description || undefined,
        area:
          values.area || undefined,
        shelf:
          values.shelf || undefined,
        quantity:
          Number(values.quantity),
        expiresAt:
          values.expiresAt || undefined,
      }),
    }
  );

  return parseResponse(response);
}

export async function updateMedicineRequest(
  id,
  values
) {
  const csrfToken = getCsrfToken();

  const response = await fetch(
    `${API_URL}/medicines/${id}`,
    {
      method: "PATCH",

      credentials: "include",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },

      body: JSON.stringify({
        articleCode: values.articleCode,
        name: values.name,
        description:
          values.description || undefined,
        area:
          values.area || undefined,
        shelf:
          values.shelf || undefined,
        quantity:
          Number(values.quantity),
        expiresAt:
          values.expiresAt || undefined,
      }),
    }
  );

  return parseResponse(response);
}

export async function deleteMedicineRequest(id) {
  const csrfToken = getCsrfToken();

  const response = await fetch(
    `${API_URL}/medicines/${id}`,
    {
      method: "DELETE",

      credentials: "include",

      headers: {
        Accept: "application/json",
        "X-CSRF-Token": csrfToken,
      },
    }
  );

  return parseResponse(response);
}

export async function uploadMedicineImageRequest(
  id,
  file
) {
  if (!(file instanceof File)) {
    throw new Error(
      "Debes seleccionar una imagen"
    );
  }

  const csrfToken = getCsrfToken();

  const formData = new FormData();

  formData.append(
    "image",
    file
  );

  const response = await fetch(
    `${API_URL}/medicines/${id}/image`,
    {
      method: "POST",

      credentials: "include",

      headers: {
        "X-CSRF-Token": csrfToken,
      },

      body: formData,
    }
  );

  return parseResponse(response);
}

// Convierte:
//
// /uploads/medicines/xxx.webp
//
// en:
//
// http://localhost:3000/uploads/medicines/xxx.webp
export function getMedicineImageUrl(imageUrl) {
  if (!imageUrl) {
    return null;
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }

  return `${BACKEND_URL}${imageUrl}`;
}