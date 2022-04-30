import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const user = { id: 1, name: "admin" };

        if (credentials?.password === process.env.PASSWORD) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
