import { Elysia, t } from "elysia";
import { registerUserService } from "../../services/users/user.service";

export const userRoutes = new Elysia()
  .post("/api/users", async ({ body, set }) => {
    const result = await registerUserService(body);

    if (!result.success) {
      set.status = 400;
      return {
        message: "User already exists"
      };
    }

    return {
      message: "User registered successfully"
    };
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String()
    })
  });
