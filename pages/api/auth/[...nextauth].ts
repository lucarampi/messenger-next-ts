import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXT_PUBLIC_SECRET!,
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/new-user'
  }
}
console.log('SERVER: AUTH OPTIONS >>>', authOptions)

export default NextAuth(authOptions)