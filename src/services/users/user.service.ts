import { db } from "../../db";
import { users } from "../../db/schema";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
}

export async function registerUserService(data: RegisterUserDto) {
  const { name, email, password } = data;

  // Lakukan query ke database menggunakan Drizzle ORM untuk mengecek apakah name ATAU email sudah terdaftar
  const existingUsers = await db
    .select()
    .from(users)
    .where(or(eq(users.name, name), eq(users.email, email)));

  if (existingUsers.length > 0) {
    return { success: false, message: "User already exists" };
  }

  // Jika belum terdaftar, lakukan hashing pada password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Lakukan query insert ke tabel users
  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return { success: true };
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export async function loginUserService(data: LoginUserDto) {
  const { email, password } = data;

  // Lakukan query ke database menggunakan Drizzle ORM untuk mencari user berdasarkan email
  const existingUsers = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUsers.length === 0) {
    return { success: false, message: "Email atau password salah" };
  }

  const user = existingUsers[0];

  // Bandingkan password input dengan password ter-hash di database menggunakan bcrypt.compare()
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { success: false, message: "Email atau password salah" };
  }

  return { success: true, user: { id: user.id, email: user.email } };
}
