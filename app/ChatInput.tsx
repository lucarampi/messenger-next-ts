"use client";

import { FormEvent, use, useState } from "react";
import useSWR from "swr";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import fetchMessages from "../utils/fetchMessages";

import { unstable_getServerSession } from "next-auth/next";
import { axiosClient } from "../services/axios";
import {PaperPlaneRight} from 'phosphor-react'

interface Props {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
}

export default function ChatInput({ session }: Props) {
  const [input, setInput] = useState("");
  const {
    data: messages,
    error,
    mutate,
  } = useSWR("/api/getMessages", fetchMessages);

  // console.log('SESSION FOROM CHATINPUT >>>',session)

  async function uploadMessageToUpstash(message: Message) {
    const { data } = await axiosClient.post("/api/addMessage", { message });

    return [data.message, ...messages!];
  }

  async function handleSendMessage(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!input) return;
    if (!session) return;

    const messageToSend = input;

    setInput("");

    const id = uuid();
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session.user?.name!,
      profilePic: session.user?.image!,
      email: session.user?.email!,
    };

    await mutate(uploadMessageToUpstash(message), {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  }

  return (
    <form
      className="fixed w-full bottom-0 z-50 flex space-x-4 px-10 py-5 border-t bg-white"
      onSubmit={handleSendMessage}
    >
      <input
        className=" flex-1 rounded border-2 border-gray-200 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="Enter message here..."
        autoComplete='off'
        autoCorrect="on"
        type="text"
        disabled={!session}
        name="chat-input"
        id="chat-input"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button
        className="
        bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
        rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={!input}
      >
        <PaperPlaneRight size={24} />
      </button>
    </form>
  );
}
