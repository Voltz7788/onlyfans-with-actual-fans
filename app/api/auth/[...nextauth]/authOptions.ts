import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/prismaGlobal";
import bcrypt from "bcryptjs";
import { generateUsername } from "unique-username-generator";
import { Adapter } from "next-auth/adapters";
import _ from "lodash";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  adapter: CustomPrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing username or password.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Incorrect email or password.");
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password!
        );

        if (!passwordsMatch) {
          throw new Error("Incorrect email or password.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.email = user?.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.email) {
        const user = await prisma.user.findUnique({
          where: { email: token.email as string },
        });

        const username = user?.username;
        const newUser = { ...user, username };
        const newSession = { ...session, user: newUser };
        return newSession;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};

function CustomPrismaAdapter(p: typeof prisma) {
  return {
    ...PrismaAdapter(p),
    createUser: (data: any) => {
      const username = generateUsername();
      const capitalisedName = _.startCase(_.toLower(data.name));
      return p.user.create({
        data: { ...data, name: capitalisedName, username },
      });
    },
  };
}
