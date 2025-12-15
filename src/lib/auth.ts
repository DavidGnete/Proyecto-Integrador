/* import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoConnection } from "@/lib/db";
import { coworking } from "./models/user"; 

//archivo imortante que permite que next-auth pueda validar los usuarios logeados o no para una transacion futura

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña requeridos");
        }

        await MongoConnection();

        const user = await coworking.findOne({ email: credentials.email });

        if (!user) throw new Error("Usuario no encontrado");

        const isCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isCorrect) throw new Error("Contraseña incorrecta");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: 1, // default role
          accessToken: '', // no token in DB auth
          refreshToken: '',
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        (session.user as {id: string}).id = token.id as string;
      }
      return session;
    },
  },
};
 */