
const API_BASE_URL = "http://localhost:8081";

/**
 * Common API request helper
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem("printeasy_token");

  const headers = {
    ...(options.headers || {}),
  };

  // JSON body ke liye Content-Type
  if (
    options.body &&
    !(options.body instanceof FormData)
  ) {
    headers["Content-Type"] = "application/json";
  }

  // JWT token
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

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


/**
 * PrintEasy API
 */
export const api = {

  // ==========================================
  // AUTH
  // ==========================================

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


  // ==========================================
  // SHOP
  // ==========================================

  // Get logged-in owner's shop
  getMyShop: () =>
    request("/api/shop/me", {
      method: "GET",
    }),

  // Create shop
  createShop: (payload) =>
    request("/api/shop", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // Update shop
  updateShop: (payload) =>
    request("/api/shop/me", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),


  // ==========================================
  // SHOP QR CODE
  // ==========================================

  getShopQr: async () => {
    const token =
      localStorage.getItem("printeasy_token");

    if (!token) {
      throw new Error(
        "Authentication token not found. Please login again."
      );
    }

    const response = await fetch(
      `${API_BASE_URL}/api/shop/qr`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      let message =
        "Failed to load shop QR code.";

      try {
        const data = await response.json();

        message =
          data?.message ||
          data?.error ||
          message;
      } catch {
        // QR endpoint image return karta hai,
        // isliye JSON parse fail hona normal hai.
      }

      throw new Error(message);
    }

    // Backend PNG image return karta hai
    return await response.blob();
  },


  uploadDocuments: async ({
    shopToken,
    customerName,
    files,
    printSettings,
  }) => {
    const formData = new FormData();

    const data = {
      shopToken,
      customerName,
      printSettings,
    };

    formData.append("data", JSON.stringify(data));

    files.forEach((file) => {
      formData.append("files", file);
    });

    return request("/api/customer/upload", {
      method: "POST",
      body: formData,
    });
  },



  uploadCustomerDocuments: async ({
    shopToken,
    customerName,
    files,
    printSettings,
  }) => {
    const formData = new FormData();

    const data = {
      shopToken,
      customerName,
      printSettings,
    };

    formData.append(
      "data",
      JSON.stringify(data)
    );

    files.forEach((file) => {
      formData.append("files", file);
    });

    return request("/api/customer/upload", {
      method: "POST",
      body: formData,
    });
  },



};


export default api;
