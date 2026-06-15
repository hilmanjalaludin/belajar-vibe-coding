# Project Setup: Bun + Elysia + Drizzle + MySQL

## Tujuan
Membuat dan menginisialisasi project backend baru menggunakan Bun, framework Elysia JS, Drizzle ORM, dan database MySQL.

## Tech Stack
- **Runtime & Package Manager**: Bun
- **Web Framework**: Elysia JS
- **ORM**: Drizzle ORM
- **Database**: MySQL

## Instruksi High-Level (Task List)

- [ ] **Inisialisasi Project**: Buat project Bun baru di dalam folder ini dan setup template dasar Elysia JS.
- [ ] **Install Dependencies**: Install package yang dibutuhkan, yaitu Elysia JS, Drizzle ORM, driver MySQL (seperti `mysql2`), dan `drizzle-kit` untuk keperluan migrasi/development.
- [ ] **Setup Database & ORM**: 
  - Buat file `.env` untuk menyimpan konfigurasi koneksi database MySQL.
  - Setup konfigurasi Drizzle ORM agar terhubung dengan database MySQL.
  - Definisikan satu schema database sederhana (contoh: schema `users` atau `posts`) sebagai awalan.
- [ ] **Integrasi Elysia & Drizzle**:
  - Konfigurasi server Elysia JS agar berjalan dengan baik.
  - Sediakan cara agar instance database Drizzle dapat diakses oleh route handler di Elysia.
  - Buat endpoint health check (misal: `GET /`) dan endpoint sederhana untuk test koneksi ke database (read/write).
- [ ] **Konfigurasi Migrasi**: Tambahkan script di `package.json` untuk memudahkan proses *generate* dan *push/apply* migrasi database menggunakan Drizzle Kit.

## Kriteria Selesai
Project berhasil dijalankan (misal dengan `bun run dev`), server Elysia merespon request dengan benar, dan aplikasi dapat melakukan query ke database MySQL via Drizzle ORM tanpa error.
