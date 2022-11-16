"use client";

import useSWR from "swr";
import { Message } from "../typings";
import fetchMessages from "../utils/fetchMessages";
import { MessageComponent } from "./MessageComponent";

export default function MessageList() {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetchMessages);
  return (
    <div className="space-y-5 transition-all px-5 pt-8 pb-32 max-w-2xl xl:max-w-6xl mx-auto">
      {messages?.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}
