import Image from "next/image";
import { Message } from "../typings";

interface MessageComponentProps {
  message: Message;
}

export function MessageComponent({ message }: MessageComponentProps) {
  return (
    <div className="flex w-fit">
      <div className="flex-shrink-0">
        <Image
          src={message.profilePic}
          alt="Profile image"
          height={10}
          width={50}
          className="rounded-full mx-2"
        />
      </div>
      <div>
        <p className="text-xs px-0.5 pb-0.5 text-red-400">{message.username}</p>
        <div className="flex items-end">
          <div className="px-3 py-2 rounded-lg w-fit text-white bg-red-400">
            <p>{message.message}</p>
          </div>
          <p className="text-xs italic px-2 text-gray-300">{new Date(message.created_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
