import { AuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";

async function exchangeAuth0Token(token: string) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/auth/exchange-auth0-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Token exchange failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Token exchange error:", error);
    return null;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: `https://${process.env.AUTH0_DOMAIN}`,
      authorization: {
        params: {
          audience: process.env.AUTH0_AUDIENCE,
          scope: "openid profile email",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          if (!response.ok) {
            return null;
          }

          const data = await response.json();

          return {
            id: data.id,
            name: data.name,
            email: data.email,
            accessToken: data.access_token,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.provider === "auth0") {
        // This is for Auth0
        const exchangedToken = await exchangeAuth0Token(
          account.access_token as string
        );
        if (exchangedToken) {
          token.accessToken = exchangedToken.accessToken;
        } else {
          token.accessToken = account.access_token;
        }
        token.provider = "auth0";
      } else if (user) {
        // This is for CredentialsProvider
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.provider = "credentials";
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.provider = token.provider as string;
      session.userId = token.id as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
