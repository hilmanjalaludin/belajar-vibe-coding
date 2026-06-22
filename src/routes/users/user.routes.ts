import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { registerUserService, loginUserService } from "../../services/users/user.service";

export const userRoutes = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "default_jwt_secret"
    })
  )
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
  })
  .post("/api/users/login", async ({ body, set, jwt }) => {
    const result = await loginUserService(body);

    if (!result.success) {
      set.status = 400; // Status 400 as per requested failed response / validation failure
      return {
        error: "Email atau password salah"
      };
    }

    const token = await jwt.sign({
      id: result.user?.id,
      email: result.user?.email
    });

    return {
      data: token
    };
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  });
