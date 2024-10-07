import NextAuth, { User } from 'next-auth'
import { authOptions } from '@/app/api/auth/option'

declare module 'next-auth' {
  interface User {
    id: string;
    fname: string;
    lname: string;
    email: string;
    avatar: string;
    access_token: string;
    refresh_token: string;
    location: string;
    title: string;
    description: string;
    tags: string;
    language: string;
    status: string;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
