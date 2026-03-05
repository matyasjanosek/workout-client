import { defineStore } from 'pinia'
import axios from 'axios'

const API = 'https://workout-api-q9v4.onrender.com'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || ''
    }),
    actions: {
        async login(username: string, password: string) {
            const res = await axios.post(`${API}/api/auth/login`, { username, password })
            this.token = res.data.token
            localStorage.setItem('token', this.token)
        },
        async register(username: string, password: string) {
            await axios.post(`${API}/api/auth/register`, { username, password })
        },
        logout() {
            this.token = ''
            localStorage.removeItem('token')
        }
    }
})