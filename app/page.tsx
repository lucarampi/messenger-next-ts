import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Provider from "./Provider";

import { unstable_getServerSession } from "next-auth/next";
import { axiosClient } from "../services/axios";

export default async function HomePage() {
  // const {data} = await axiosClient.get("/api/getMessages");
  const messages: Message[] = [];

  const session = await unstable_getServerSession();
  
  // const session = {
  //   user:{
  //     email:'temp@mail.com',
  //     image:'',
  //     name:'Temp Name'
      
  //   }
  // } as  Awaited<ReturnType<typeof unstable_getServerSession>>

  return (
    <Provider session={session}>
      <main>
        <MessageList session={session} initialMessages={messages} />
        <ChatInput session={session} />
      </main>
    </Provider>
  );
}
