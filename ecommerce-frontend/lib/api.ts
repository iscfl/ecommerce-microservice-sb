// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "An error occurred while fetching data")
  }
  return response.json()
}

// Function to get auth headers
function getAuthHeaders(token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  return headers
}

// Products API
export const productsApi = {
  getAll: async (token?: string) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: getAuthHeaders(token),
    })
    return handleResponse(response)
  },

  getById: async (id: string, token?: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: getAuthHeaders(token),
    })
    return handleResponse(response)
  },

  create: async (productData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(productData),
    })
    return handleResponse(response)
  },

  update: async (id: string, productData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(token),
      body: JSON.stringify(productData),
    })
    return handleResponse(response)
  },

  delete: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    })
    return handleResponse(response)
  },
}

// Orders API
export const ordersApi = {
  getAll: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: getAuthHeaders(token),
    })
    return handleResponse(response)
  },

  getById: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: getAuthHeaders(token),
    })
    return handleResponse(response)
  },

  create: async (orderData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(orderData),
    })
    return handleResponse(response)
  },

  updateStatus: async (id: string, status: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ status }),
    })
    return handleResponse(response)
  },
}

// Users API
export const usersApi = {
  getProfile: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: getAuthHeaders(token),
    })
    return handleResponse(response)
  },

  updateProfile: async (profileData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "PUT",
      headers: getAuthHeaders(token),
      body: JSON.stringify(profileData),
    })
    return handleResponse(response)
  },
}
