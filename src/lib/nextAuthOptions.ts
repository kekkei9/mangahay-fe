//@ts-nocheck

import { AxiosInstance } from "axios";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { setAuthToken } from "@/services/backend/axiosClient";
import { Account, Login, Response } from "@/types/Response.type";
import { signOut } from "next-auth/react";

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
          const res = await axiosClient.post<Response<Login>>(
            "/api/auth/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          if (!res.data.success) return null;

          return res.data.result;
        } catch (e) {
          console.log(e);
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
    async redirect({ url, baseUrl }) {
      const redirectUrl = decodeURIComponent(url);
      const callbackIndex = redirectUrl.lastIndexOf("?callbackUrl=");

      if (callbackIndex > -1) {
        const callbackPath = redirectUrl.slice(callbackIndex);
        return callbackPath.includes(baseUrl)
          ? callbackPath
          : baseUrl + callbackPath;
      }

      return baseUrl;
    },
    async signIn({ account, profile, credentials }) {
      if (account?.provider === "credentials") return true;
      return true;
    },
    async jwt({ token, account, profile, user }) {
      if (user) {
        setAuthToken(user.access_token);

        token[process.env.NEXT_PUBLIC_TOKEN_KEY] = user.access_token;
        token[process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY] = user.refresh_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      try {
        const { data: res } = await axiosClient.get<Response<Account>>(
          "/api/user/credentials"
        );

        const userData = res.result;

        if (userData) {
          const { id, email, fullname, avatar } = userData;
          session.user.id = id;
          session.user.email = email;
          session.user.name = fullname;
          session.image = avatar;
        }
      } catch (e) {
        console.error(e);
      }

      return session;
    },
  },
});

export default authOptions;
