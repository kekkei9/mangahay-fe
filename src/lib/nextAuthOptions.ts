//@ts-nocheck

import { AxiosInstance } from "axios";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { setAuthToken } from "@/services/backend/axiosClient";
import { LoginResponse } from "@/types/Response.type";

const authOptions = (axiosClient: AxiosInstance) => ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "emailLogin",
      name: "Email Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await axiosClient.post<LoginResponse>(
            process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/api/auth/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          if (!res.data.success) return null;
          setAuthToken(res.data?.result.access_token);
          return res.data;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  callbacks: {
    async signIn({ account, profile, credentials }) {
      if (account?.provider === "credentials") return true;
      return true;
    },
  },
});

export default authOptions;
