"use client";

import { FormEvent, use, useState } from "react";
import useSWR from "swr";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import fetchMessages from "../utils/fetchMessages";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const {
    data: messages,
    error,
    mutate,
  } = useSWR("/api/getMessages", fetchMessages);

  async function uploadMessageToUpstash(message: Message) {
    const data = await fetch("/api/addMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }).then((res) => res.json());

    return [data.message, ...messages!];
  }

  async function handleSendMessage(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!input) return;
    const messageToSend = input;

    setInput("");

    const id = uuid();
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: "Luca Alfaro Rampinelli",
      profilePic:
        "https://lh3.googleusercontent.com/a/ALm5wu2f9uNDMtewreE0JVAXep7WFYIywb9VhtVa3SFTJA=s83-c-mo",
      email: "luca.alfaro.rampinelli@gmail.com",
    };

    await mutate(uploadMessageToUpstash(message),{
      optimisticData:[message,...messages!],
      rollbackOnError:true
    });
  }

  return (
    <form
      className="fixed w-full bottom-0 z-50 flex space-x-2 px-10 py-5
    border-t border-gray-100 "
      onSubmit={handleSendMessage}
    >
      <input
        className=" flex-1 rounded border-2 border-gray-200 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="Enter message here..."
        type="text"
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
        Send
      </button>
    </form>
  );
}
