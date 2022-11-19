import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: `https://${process.env.VERCEL_URL}`
}) 