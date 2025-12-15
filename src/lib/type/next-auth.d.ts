import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    role: number
    accessToken: string
    refreshToken: string
  }

  interface Session {
    user: {
      id: string
      name: string | null | undefined
      email: string | null| undefined
      role: number
    }
    accessToken: string
    refreshToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name: string | null | undefined
    email: string | null | undefined
    role: number
    accessToken: string
    refreshToken: string
  }
}
