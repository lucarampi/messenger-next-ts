import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: process.env.VERCEL_URL
}) 