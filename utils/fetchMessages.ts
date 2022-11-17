import { axiosClient } from "../services/axios";
import { Message } from "../typings";


const fetcher = async () => {
    const {data} = await axiosClient.get('/api/getMessages');
    const messages: Message[] = data.messages;

    return messages;
}

export default fetcher;