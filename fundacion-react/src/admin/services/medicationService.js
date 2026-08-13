async function parseResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `La solicitud falló con código ${response.status}`
    );
  }

  return data;
}

const MEDICATION_PREFIX = "medication_";

function isMedication(section) {
  return section.content_key?.startsWith(MEDICATION_PREFIX);
}

function normalize(row) {
  return {
    id: row.content_key,
    name: row.title || "",
    description: row.content || "",
    dosage: row.section_name || "",
    image_url: row.image_url || "",
    is_active: row.is_active !== false,
    updated_at: row.updated_at,
  };
}

function toPayload(form) {
  return {
    sectionName: form.dosage?.trim() || "Presentación no especificada",
    title: form.name?.trim() || "",
    content: form.description?.trim() || "",
    imageUrl: form.imageUrl?.trim() || null,
    isActive: form.isActive !== false,
  };
}

export async function getMedications() {
  const response = await fetch("/api/content", {
    headers: {
      Accept: "application/json",
    },
  });

  const data = await parseResponse(response);

  return (data.content || [])
    .filter(isMedication)
    .map(normalize);
}

export async function getMedication(key) {
  const response = await fetch(
    `/api/content/${encodeURIComponent(key)}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  const data = await parseResponse(response);
  return normalize(data.content);
}

export async function createMedication(form) {
  const slug = (form.name || "nuevo")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40);

  const contentKey = `${MEDICATION_PREFIX}${slug}_${Date.now()}`;

  const response = await fetch("/api/content", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contentKey,
      ...toPayload(form),
    }),
  });

  const data = await parseResponse(response);
  return normalize(data.content);
}

export async function updateMedication(key, form) {
  const response = await fetch(
    `/api/content/${encodeURIComponent(key)}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toPayload(form)),
    }
  );

  const data = await parseResponse(response);
  return normalize(data.content);
}

export async function uploadMedicationImage(file) {
  if (!(file instanceof File)) {
    throw new Error("Debes seleccionar una imagen");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("/api/uploads/content-image", {
    method: "POST",
    body: formData,
  });

  return parseResponse(response);
}