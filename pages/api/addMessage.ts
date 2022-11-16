import type { NextApiRequest, NextApiResponse } from 'next'
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

    //Push new message to redis db
    await redis.hset('messages', message.id, JSON.stringify(newMessage))

    res.status(200).json({ message: newMessage })
}
