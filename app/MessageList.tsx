"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { clientPusher } from "../services/pusher";
import { Message } from "../typings";
import fetchMessages from "../utils/fetchMessages";
import { MessageComponent } from "./MessageComponent";
import { unstable_getServerSession } from "next-auth/next";

interface Props {
  initialMessages: Message[];
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
}

export default function MessageList({ session, initialMessages }: Props) {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetchMessages);

  useEffect(() => {
    console.log(session)
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", async (data: Message) => {
      if (messages?.find((message) => message.id === data.id)) return;
      if (!messages) {
        mutate(fetchMessages);
      } else {
        mutate(fetchMessages, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);
  return (
    <div className="space-y-5 transition-colors px-5 pt-8 pb-32 max-w-2xl xl:max-w-6xl mx-auto">
      {(messages || initialMessages).map((message) => (
        <MessageComponent key={message.id} email={session?.user?.email!} message={message} />
      ))}
    </div>
  );
}
