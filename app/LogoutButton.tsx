"use client";

import { signOut } from "next-auth/react";


export default function LogoutButton() {
  return (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
