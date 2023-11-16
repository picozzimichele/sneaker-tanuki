import User from "@/lib/models/user.models";
import { connectToDB } from "@/lib/mongodb";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import bcrypt from "bcryptjs";
import {
    RegisterOAuthUser,
    ValidateRegistrationUser,
    updateUser,
} from "@/lib/actions/user.actions";

declare module "next-auth" {
    interface User {
        id: number; // <- here it is
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials: any) {
                const { email, password } = credentials;
                try {
                    await connectToDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) {
                        return null;
                    }

                    return user;
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            //registering user coming from OAuth providers
            //TODO add twitter secret
            if (
                (account?.provider === "google" ||
                    account?.provider === "github" ||
                    account?.provider === "twitter") &&
                user?.email &&
                user?.name &&
                user?.image
            ) {
                try {
                    const userExists = await ValidateRegistrationUser({
                        email: user.email,
                        isClient: false,
                    });
                    if (
                        (userExists?._id && !userExists.image) ||
                        (userExists?._id && userExists.image !== user?.image)
                    ) {
                        await updateUser({ userId: userExists?._id as string, image: user?.image });
                    }
                    if (!userExists?._id) {
                        await RegisterOAuthUser({
                            email: user.email,
                            name: user.name,
                            image: user?.image,
                        });
                    }
                } catch (error: any) {
                    throw new Error(error.message);
                }
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign-in",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
