import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`
}) 