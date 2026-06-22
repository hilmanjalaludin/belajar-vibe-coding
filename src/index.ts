import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";
import { userRoutes } from "./routes/users/user.routes";

const app = new Elysia()
  .get("/", () => "Hello Elysia + Drizzle!")
  .get("/users", async () => {
    try {
      const allUsers = await db.select().from(users);
      return { success: true, data: allUsers };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to fetch users. Check your database connection." };
    }
  })
  .use(userRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
