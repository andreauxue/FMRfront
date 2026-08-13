// src/hooks/useMedications.js
// Hook público para consultar medicamentos disponibles.
//
// Endpoint:
// GET /api/medicines
//
// No requiere autenticación.

import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:3000";

async function fetchMedications() {
  const response = await fetch(
    `${API_URL}/medicines`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const data = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `No fue posible cargar los medicamentos (${response.status})`
    );
  }

  const rows = Array.isArray(data)
    ? data
    : data?.medicines || [];

  return rows.map((medicine) => ({
    id: medicine.id,

    articleCode:
      medicine.articleCode || "",

    name:
      medicine.name || "",

    description:
      medicine.description || "",

    quantity:
      Number(medicine.quantity || 0),

    expiresAt:
      medicine.expiresAt || null,

    imageUrl:
      getImageUrl(medicine.imageUrl),

    available:
      Number(medicine.quantity || 0) > 0,
  }));
}

function getImageUrl(imageUrl) {
  if (!imageUrl) {
    return "";
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }

  return `${BACKEND_URL}${imageUrl}`;
}

export function useMedications() {
  const [medications, setMedications] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadMedications() {
      try {
        setIsLoading(true);
        setError("");

        const data =
          await fetchMedications();

        if (!cancelled) {
          setMedications(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "No fue posible cargar los medicamentos"
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadMedications();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    medications,
    isLoading,
    error,
  };
}