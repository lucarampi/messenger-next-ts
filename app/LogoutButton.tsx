"use client";

import { signOut } from "next-auth/react";
import {IoLogOutOutline} from 'react-icons/io5'

export default function LogoutButton() {
  return (
    <button
      type="button"
      className="hover:text-blue-700 text-gray-400  transition-all"
      onClick={() => signOut()}
    >
      <IoLogOutOutline size={22}/>
    </button>
  );
}
