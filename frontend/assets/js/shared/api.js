export const parseJsonSafely = async (response) => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return { mensaje: text };
  }
};

export const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  const data = await parseJsonSafely(response);

  if (!response.ok) {
    const message = data?.mensaje || data?.message || `Error HTTP ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};
