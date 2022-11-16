"use client";

import useSWR from "swr";
import { Message } from "../typings";
import fetchMessages from "../utils/fetchMessages";

export default function MessageList() {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetchMessages);
  return (
    <div>
{messages?.map(message=>(
  <div key={message.id}>
    <p>{message.message}</p>
  </div>
))}
    </div>
  );
}
