import Pusher from 'pusher'
import ClientPusher from 'pusher-js'

export const serverPusher = new Pusher({
    appId: process.env.PUSHER_APPID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "sa1",
    useTLS: true
});

export const clientPusher = new ClientPusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: 'sa1',
    forceTLS: true
});