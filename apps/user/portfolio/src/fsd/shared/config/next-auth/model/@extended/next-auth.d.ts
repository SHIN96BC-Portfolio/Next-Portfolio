import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface JWT {
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    id?: string;
    name?: string;
    email?: string;
    image?: string;
  }
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    } & DefaultSession['user'];
  }
  interface Profile {
    id: string;
  }
  interface User {
    access_token: string;
    refresh_token: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}
