const API_BASE_URL = "http://localhost:8081";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("printeasy_token");

  const headers = {
    ...(options.headers || {}),
  };

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}

export const api = {
  register: (payload) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getMyShop: () =>
    request("/api/shop/me", {
      method: "GET",
    }),

  createShop: (payload) =>
    request("/api/shop", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  updateShop: (payload) =>
    request("/api/shop/me", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};

export default api;