/// <reference path="../.astro/types.d.ts" />

interface User {
  email: string;
  name: string;
  // TODO: Add these fields
  // avatar: string;
  // emailVerified: boolean;
}

declare namespace App {
  interface Locals {
    isLoggedIn: boolean;
    isAdmin: boolean;
    user: User | null;
  }
}
