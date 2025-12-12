import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoConnection } from "@/lib/db";
import { coworking } from "@/lib/models/user";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const res= await fetch ("https://work-point-9be66ef1d8d3.herokuapp.com/api/Auth/login", {
          method:"POST",
          headers: {"Content-Type": "application/json"},
          body:JSON.stringify({
            email:credentials?.email,
            password:credentials?.password,
          })
        });
        if(!res.ok) return null;

        const user = await res.json();
        return user;
      },
    }),
  ],

/*   callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      // cast to any to add custom fields without changing NextAuth types here
      (session.user as any).id = (token as any).id;
      (session.user as any).name = (token as any).name;
      return session;
    },
  }, */

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };