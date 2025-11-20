import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

const serverConnection: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface SignupData {
  name?: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export const AuthServices = {
  signup(data: SignupData): Promise<AxiosResponse<any>> {
    return serverConnection.post('/auth/signup', data)
  },
  login(data: LoginData): Promise<AxiosResponse<any>> {
    return serverConnection.post('/auth/login', data)
  },
}
