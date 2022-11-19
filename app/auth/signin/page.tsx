import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

export default async function Page() {
  const providers = await getProviders();
  // console.log('GET PROVIDERS >>>',providers)
  return (
    <div className="flex pt-8 space-y-10 flex-col items-center justify-center">
      <div >
        <Image
        className="mx-2 object-cover "
        src="/logo-messenger.png" alt="logo" height={200} width={200} />
      </div>
      <SignInComponent providers={providers}/>
    </div>
  );
}
