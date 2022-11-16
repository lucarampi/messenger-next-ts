"use client";

import { FormEvent, useState } from "react";

export default function ChatInput() {
  const [input, setInput] = useState("");
  function handleSendMessage(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!input) return;
    const messageToSend = input;
    
    setInput('')
  }
  return (
    <form
      className="fixed w-full bottom-0 z-50 flex space-x-2 px-10 py-5
    border-t border-gray-100 "
      onSubmit={handleSendMessage}
    >
      <input
        className="
        flex-1 rounded border-gray-300 outline-none focus:ring-2 focus:ring-blue-600
        focus:border-transparent px-5 py-3 disabled:opacity-50
        disabled:cursor-not-allowed"
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
