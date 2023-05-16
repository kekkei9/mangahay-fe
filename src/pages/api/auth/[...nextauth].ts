import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import authOptions from "@/lib/nextAuthOptions";
import axiosClient from "@/services/backend/axiosClient";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions(axiosClient) as any);
}
