import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID || "",
      issuer: process.env.KEYCLOAK_ISSUER || "",
      // No client secret needed for PKCE flow
      authorization: { params: { scope: "openid" } }, // openid scope is required for Keycloak v22+ [^1]
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider
      session.accessToken = token.accessToken
      return session
    },
  },
})

export { handler as GET, handler as POST }
