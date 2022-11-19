import type { NextApiRequest, NextApiResponse } from 'next'
import { serverPusher } from '../../services/pusher';
import redis from '../../services/redis';
import { Message } from '../../typings';

type Data = {
    message: Message
}
type ErrorData = {
    body: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>
) {
    if (req.method !== 'POST') {
        res.status(405).json({ body: 'Method Not Allowed' })
        return;
    }

    const { message } = req.body;

    {/*
    Replace the timestamp of the user to the
    timestamp of the server
    */}

    const newMessage: Message = {
        ...message,
        created_at: Date.now()
    }

    if (newMessage.message.length > 250) {
        res.status(403).json({ body: 'Nope, but nice try... The max lenth is 250, deal with it! ' })
        return;
    }

    //Push new message to redis db
    await redis.hset('messages', newMessage.id, JSON.stringify(newMessage));
    serverPusher.trigger("messages", 'new-message', newMessage);

    res.status(200).json({ message: newMessage })
}
