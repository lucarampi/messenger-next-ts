import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Provider from "./Provider";

import {unstable_getServerSession} from 'next-auth/next'

export default async function HomePage() {
  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then(
    (res) => res.json()
  );

  const messages: Message[] = data.messages;

  const session = await unstable_getServerSession()
  console.log(session)

  return (
    <Provider session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <ChatInput session={session} />
      </main>
    </Provider>
  );
}
