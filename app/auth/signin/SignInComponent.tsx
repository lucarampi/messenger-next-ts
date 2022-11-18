"use client";
import { getProviders, signIn, useSession } from "next-auth/react";

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

export default function SignInComponent({ providers }: Props) {
  const error = [{ name: "error", id: "error" }];
  // const {data} = useSession()
  // console.log('DATA FROM SIGNIN COMPONENT >>>',data)
  return (
    <div>
      {Object.values(providers! || error).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
            onClick={() => {signIn(provider.id,{
              callbackUrl:'/'
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
