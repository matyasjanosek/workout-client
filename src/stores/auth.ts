import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || ''
    }),
    actions: {
        async login(username: string, password: string) {
            const res = await axios.post('http://localhost:3000/api/auth/login', { username, password })
            this.token = res.data.token
            localStorage.setItem('token', this.token)
        },
        async register(username: string, password: string) {
            await axios.post('http://localhost:3000/api/auth/register', { username, password })
        },
        logout() {
            this.token = ''
            localStorage.removeItem('token')
        }
    }
})