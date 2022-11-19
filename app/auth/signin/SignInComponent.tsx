"use client";
import { getProviders, signIn, useSession } from "next-auth/react";
import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import {  FcGoogle } from "react-icons/fc";

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

export default function SignInComponent({ providers }: Props) {
  const error = [{ name: "error", id: "error" }];
  // const {data} = useSession()
  // console.log('DATA FROM SIGNIN COMPONENT >>>',data)

  return (
    <div className="flex flex-col gap-3">
      {Object.values(providers! || error).map((provider) => (
        <div key={provider.name}>
          <button
            className={`flex  items-center justify-center gap-2 text-white w-full font-bold py-2 px-4 rounded transition-all ${
              provider.name.toLowerCase() === "facebook" &&
              "bg-blue-500 w-full hover:bg-blue-700 "
            }
            ${
              provider.name.toLowerCase() === "google" &&
              "bg-red-400 w-full hover:bg-red-600 "
            }
            `}
            onClick={() => {
              signIn(provider.id, {
                callbackUrl: "/",
              });
            }}
          >
            {provider.name.toLowerCase() === "facebook" && <FaFacebook size={22} /> }
            {provider.name.toLowerCase() === "google" && <span className="bg-white rounded-full p-0.5"><FcGoogle size={20} /></span> }
            {" "}
            Sign in with {provider.name}

          </button>
        </div>
      ))}
    </div>
  );
}
