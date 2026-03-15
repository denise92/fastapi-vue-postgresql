const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const apiV1 = `${apiBaseUrl}/api/v1`;

export interface Order {
  id: number;
  user_id: number;
  status: string;
  total_amount: number;
  notes?: string;
  created_at?: string;
}

export interface ShippingAddress {
  id: number;
  user_id: number;
  recipient_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postal_code?: string;
  is_default: boolean;
}

export interface ShippingAddressCreate {
  recipient_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postal_code?: string;
  is_default?: boolean;
}

export interface ShippingAddressUpdate {
  recipient_name?: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  postal_code?: string;
  is_default?: boolean;
}

async function memberFetch<T>(
  path: string,
  token: string,
  options?: RequestInit
): Promise<T> {
  const url = `${apiV1}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || res.statusText);
  }
  return res.json();
}

export async function getMyOrders(token: string, skip = 0, limit = 100): Promise<Order[]> {
  return memberFetch<Order[]>(`/member/orders?skip=${skip}&limit=${limit}`, token);
}

export async function getOrder(token: string, orderId: number): Promise<Order> {
  return memberFetch<Order>(`/member/orders/${orderId}`, token);
}

export async function getMyAddresses(token: string, skip = 0, limit = 100): Promise<ShippingAddress[]> {
  return memberFetch<ShippingAddress[]>(`/member/addresses?skip=${skip}&limit=${limit}`, token);
}

export async function getAddress(token: string, addressId: number): Promise<ShippingAddress> {
  return memberFetch<ShippingAddress>(`/member/addresses/${addressId}`, token);
}

export async function createAddress(
  token: string,
  data: ShippingAddressCreate
): Promise<ShippingAddress> {
  return memberFetch<ShippingAddress>("/member/addresses", token, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAddress(
  token: string,
  addressId: number,
  data: ShippingAddressUpdate
): Promise<ShippingAddress> {
  return memberFetch<ShippingAddress>(`/member/addresses/${addressId}`, token, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAddress(token: string, addressId: number): Promise<ShippingAddress> {
  return memberFetch<ShippingAddress>(`/member/addresses/${addressId}`, token, {
    method: "DELETE",
  });
}
