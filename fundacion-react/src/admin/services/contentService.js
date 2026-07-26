async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `La solicitud falló con el código ${response.status}`
    );
  }

  return data;
}

export async function getSiteContent() {
  const data = await request("/api/content");
  return data.content;
}

export async function getContentSection(key) {
  const data = await request(`/api/content/${key}`);
  return data.content;
}

export async function updateContentSection(key, values) {
  const data = await request(`/api/content/${key}`, {
    method: "PUT",
    body: JSON.stringify(values),
  });

  return data;
}