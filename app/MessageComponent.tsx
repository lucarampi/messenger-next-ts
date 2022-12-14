import Image from "next/image";
import { Message } from "../typings";
import TimeAgo from "react-timeago";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface MessageComponentProps {
  message: Message;
  session: Session;
}

export function MessageComponent({ session, message }: MessageComponentProps) {
  const isUser = () =>
    session.user?.email === message.email &&
    session.user?.image === message.profilePic &&
    session.user?.name?.toLocaleLowerCase() ===
      message.username.toLocaleLowerCase()
      ? true
      : false;

  return (
    <div className={`flex w-fit items-end ${isUser() ? "ml-auto" : ""}`}>
      <div className={`flex-shrink-0 ${isUser() ? "order-2" : ""}`}>
        <Image
          src={message.profilePic}
          alt="Profile image"
          height={20}
          width={50}
          className="rounded-full object-contain mx-2"
        />
      </div>
      <div>
        <p
          className={`text-xs px-0.5 pb-0.5 ${
            isUser() ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {message.username}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white  ${
              isUser() ? "bg-blue-400 ml-auto order-2" : "bg-red-400"
            }`}
          >
            <p>{message.message}</p>
          </div>
          <p
            className={`text-xs italic px-2 text-gray-300 text-left ${
              isUser() && "text-white text-right"
            }`}
          >
            <TimeAgo date={new Date(message.created_at)} />
          </p>
        </div>
      </div>
    </div>
  );
}
