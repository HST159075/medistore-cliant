import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://medistore-dusky.vercel.app",
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },
});

export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user & { role: string };
