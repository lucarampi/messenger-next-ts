import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { unstable_getServerSession } from "next-auth/next";

export default async function Header() {
  const session = await unstable_getServerSession();
  // const session = {
  //   user:{
  //     email:'temp@mail.com',
  //     image:'',
  //     name:'Temp Name'
      
  //   }
  // } as  Awaited<ReturnType<typeof unstable_getServerSession>>

  if (session)
    return (
      <header className="flex justify-between items-center px-10 py-4 shadow-md shadow-slate-200 sticky top-0 z-50 bg-white lex">
        <div className="flex flex-col items-center space-y-5">
          <div className="flex space-x-2">
            <Image
              className="rounded-full mx-2 object-cover "
              src={session.user?.image!}
              alt="profile picture"
              height={10}
              width={50}
            />
            <div>
              <p className="text-blue-400">Logged in as:</p>
              <p className="font-bold text-lg">{session.user?.name}</p>
            </div>
          </div>
        </div>
        <LogoutButton />
      </header>
    );
  return (
    <header className="flex justify-center items-center px-10 py-7 shadow-md shadow-slate-200 sticky top-0 z-50 bg-white lex">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <p className="text-blue-500">Welcome to Earth Messenger</p>
        </div>
      </div>
    </header>
  );
}
