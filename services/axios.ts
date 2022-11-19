import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
    headers:{
         'Access-Control-Allow-Headers': true
    }
}) 