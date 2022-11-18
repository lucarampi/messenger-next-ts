"use client";
import { getProviders, signIn } from "next-auth/react";

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

export default function SignInComponent({ providers }: Props) {
  const error = [{ name: "error", id: "error" }];
  return (
    <div>
      {Object.values(providers! || error).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
            onClick={() => {
              console.log(provider);
              console.log("VERCEL URL >>>", process.env.VERCEL_URL);

              signIn(provider.id, {
                callbackUrl: process.env.VERCEL_URL,
              });
            }}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
