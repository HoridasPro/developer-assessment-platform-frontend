// import { ofetch } from "ofetch";
// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// const apiClient = ofetch.create({
//   baseURL: BASE_URL,
//   credentials: "include",
// });
// export default apiClient;

import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",

  onRequest({ options }) {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        options.headers = new Headers(options.headers);

        options.headers.set("Authorization", `Bearer ${accessToken}`);
      }
    }
  },
});

export default apiClient;
