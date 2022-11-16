import Image from "next/image";
import { Message } from "../typings";

interface MessageComponentProps {
  message: Message;
}

export function MessageComponent({ message }: MessageComponentProps) {
    const isUser = true;
  return (
    <div className={`flex w-fit ${isUser && 'ml-auto'}`}>
      <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
        <Image
          src={message.profilePic}
          alt="Profile image"
          height={10}
          width={50}
          className="rounded-full mx-2"
        />
      </div>
      <div>
        <p className={`text-xs px-0.5 pb-0.5  ${isUser ? 'text-blue-400 text-right' : 'text-red-400 text-left'}`}>{message.username}</p>
        <div className="flex items-end">
          <div className={`px-3 py-2 rounded-lg w-fit text-white  ${isUser ? 'bg-blue-400 ml-auto order-2' : 'bg-red-400'}`}>
            <p>{message.message}</p>
          </div>
          <p className={`text-xs italic px-2 text-gray-300 text-left ${isUser && 'text-white text-right'}`}>{new Date(message.created_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
