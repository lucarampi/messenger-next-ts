import NextAuth, { NextAuthOptions } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
    , FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  // secret: process.env.NEXT_PUBLIC_SECRET!,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   console.log('REDIRECT CALLBACK!', url,baseUrl)
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // }
  }
}
// console.log('SERVER: AUTH OPTIONS >>>', authOptions)
// console.log("VERCEL URL >>>", process.env.VERCEL_URL);


export default NextAuth(authOptions)