import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
}) 