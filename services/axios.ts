import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: `${process.env.APP_URL}`,
    headers:{
         
    }
}) 