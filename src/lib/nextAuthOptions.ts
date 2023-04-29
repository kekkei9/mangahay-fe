import { NextAuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
		}),
	],
	pages: {
		// signIn: '/auth/signin', // custom route for sign in, if not provided, next-auth uses its own UI
	},
	callbacks: {
		signIn: async ({ user, account, profile }) => {
			// account contains information about providers, token, etc.
			// user & profile contains information about the user: email, username, image, etc.
			// User is returned fromm credentials provider
			// Profile is returned from OAuth provider

			// ==================================================
			// ONLY MODIFY THIS IF CHANGE TO CREDENTIALS PROVIDER
			// ==================================================
			return true;
			// Return true means success, false means failure
		},
	},
};

export default authOptions;
