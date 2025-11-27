import axios from "axios"
import { api } from "./constants"

export const apiClient = axios.create({
   baseURL: api,
   withCredentials: true,
   timeout: 5000, // 5 seconds timeout
})
