import { AuthOptions } from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

const host = process.env.NEXT_PUBLIC_API_AUTH_SERVER_URL;

const nextAuthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'EMAIL',
          type: 'email',
        },
        password: {
          label: 'PW',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${host}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.username,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (user && user.result) {
          // Any object returned will be saved in `user` property of the JWT
          return user.result;
        }
        // If you return null then an error will be displayed advising the user to check their details.
        throw new Error('An unknown error occurred.');

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
    // EmailProvider({}),
    AppleProvider({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_APPLE_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_NAVER_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, credentials }) {
      // 커스텀 에러 처리
      if (!user) {
        throw new Error('Invalid login');
      }
      return true;
    },
    async jwt({ token, account, profile, user, session }) {
      const newToken = { ...token };
      if (account && account.provider !== 'credentials') {
        newToken.accessToken = account.access_token;
        newToken.refreshToken = account.refresh_token;
        if (profile) {
          newToken.id = profile.id;
          newToken.email = profile.email;
          newToken.name = profile.name;
          newToken.image = profile.image;
        }
      } else if (user) {
        newToken.accessToken = user.access_token;
        newToken.refreshToken = user.refresh_token;
        newToken.id = user.user.id;
        newToken.name = user.user.name;
        newToken.email = user.user.email;
        newToken.image = user.user.image;
      }

      return newToken;
    },
    async session({ session, token, user }) {
      const newSession = { ...session };
      newSession.accessToken = token.accessToken as string;
      newSession.user.id = token.id as string;
      newSession.user.name = token.name as string;
      newSession.user.email = token.email as string;
      newSession.user.image = token.image as string;

      return newSession;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
};

export default nextAuthOptions;
