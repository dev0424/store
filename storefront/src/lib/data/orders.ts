"use server";

import { sdk } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import { getAuthHeaders, getCacheOptions, getCacheTag } from "./cookies";
import {
  StoreOrderResponse,
  StoreOrderListResponse,
  StoreOrder,
} from "@medusajs/types";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const retrieveOrder = async (id: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const next = {
    ...(await getCacheOptions("orders")),
  };

  return sdk.client
    .fetch<StoreOrderResponse>(`/store/order/${id}`, {
      method: "GET",
      query: {
        fields:
          "*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product",
      },
      headers,
      next,
      // cache: "force-cache",
    })
    .then(({ order }) => order)
    .catch((err) => medusaError(err));
};

export const listOrders = async (filters?: Record<string, any>) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const next = {
    ...(await getCacheOptions("orders")),
  };

  return sdk.client
    .fetch<StoreOrderListResponse>(`/store/order`, {
      method: "GET",
      query: {
        order: "-created_at",
        fields: "*items,+items.metadata,*items.variant,*items.product",
        ...filters,
      },
      headers,
      // next,
      // cache: "force-cache",
    })
    .then(({ orders }) => orders)
    .catch((err) => medusaError(err));
};

export const createTransferRequest = async (
  state: {
    success: boolean;
    error: string | null;
    order: StoreOrder | null;
  },
  formData: FormData,
): Promise<{
  success: boolean;
  error: string | null;
  order: StoreOrder | null;
}> => {
  const id = formData.get("order_id") as string;

  if (!id) {
    return { success: false, error: "Order ID is required", order: null };
  }

  const headers = await getAuthHeaders();

  return await sdk.store.order
    .requestTransfer(
      id,
      {},
      {
        fields: "id, email",
      },
      headers,
    )
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }));
};

export const acceptTransferRequest = async (id: string, token: string) => {
  const headers = await getAuthHeaders();

  return await sdk.store.order
    .acceptTransfer(id, { token }, {}, headers)
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }));
};

export const declineTransferRequest = async (id: string, token: string) => {
  const headers = await getAuthHeaders();

  return await sdk.store.order
    .declineTransfer(id, { token }, {}, headers)
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }));
};

export const acceptQuote = async (id: string, countryCode: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  await sdk.client
    .fetch<StoreOrderListResponse>(`/store/order/${id}/accept`, {
      method: "GET",
      headers,
    })
    .then(async ({ orders }) => orders)
    .catch((err) => medusaError(err));

  const orderCacheTag = await getCacheTag("orders");
  revalidateTag(orderCacheTag);

  redirect(`/${countryCode}/order/${id}/confirmed`);
};

export const declineQuote = async (id: string, countryCode: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  await sdk.client
    .fetch<{ success: boolean }>(`/store/order/${id}/decline`, {
      method: "DELETE",
      headers,
    })
    .catch((err) => medusaError(err));

  const orderCacheTag = await getCacheTag("orders");
  revalidateTag(orderCacheTag);

  redirect(`/${countryCode}/account/quotes`);
};
