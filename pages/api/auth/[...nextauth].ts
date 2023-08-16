import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export default NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn(signIn) {
      return signIn.user.email === "username@gmail.com";
    },
    async session({ session, user }) {
      try {
        // Add user ID and role to session object
        return {
          ...session,
          userId: user.id,
          user: {
            ...session.user,
            id: user.id,
            name: user.name,
          },
        };
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    },
  },
});
