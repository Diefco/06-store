// import GitHub from "@auth/core/providers/github";
import { defineConfig } from "auth-astro";
import { db, eq, User } from "astro:db";
import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs";

export default defineConfig({
  providers: [
    // TODO:
    // GitHub({
    //   clientId: import.meta.env.GITHUB_CLIENT_ID,
    //   clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    // }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async ({ email, password }) => {
        const [user] = await db
          .select()
          .from(User)
          .where(eq(User.email, `${email}`));

        if (!user) {
          throw new Error("User not found");
        }

        if (!bcrypt.compareSync(`${password}`, user.password)) {
          throw new Error("Invalid password");
        }

        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
});
