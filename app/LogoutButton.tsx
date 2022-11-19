"use client";

import { signOut } from "next-auth/react";
import {IoLogOutOutline} from 'react-icons/io5'

export default function LogoutButton() {
  return (
    <button
      type="button"
      className="bg-gray-200 hover:bg-gray-700 text-gray-500 hover:text-white font-bold py-2 px-4 rounded transition-all"
      onClick={() => signOut()}
    >
      <IoLogOutOutline size={22}/>
    </button>
  );
}
