"use server";

import { cookies } from "next/headers";

export const confirmPayment = async (sessionId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/payments/webhook`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        sessionId,
      }),
    },
  );

  return res.json();
};
