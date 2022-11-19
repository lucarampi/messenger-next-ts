import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Provider from "./Provider";

import { unstable_getServerSession } from "next-auth/next";
import getMessages from "../utils/fetchMessages";

export default async function HomePage() {
  const session = await unstable_getServerSession();
  const messages: Message[] = session ? await getMessages() : [];

  return (
    <Provider session={session}>
      <main>
        <MessageList session={session} initialMessages={messages} />
      
          <ChatInput session={session} />
    
      </main>
    </Provider>
  );
}
