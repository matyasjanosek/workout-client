import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

const API = 'https://workout-api-q9v4.onrender.com'

export const useExerciseStore = defineStore('exercises', {
    state: () => ({
        exercises: [] as any[],
        logs: [] as any[]
    }),
    actions: {
        async fetchExercises() {
            const auth = useAuthStore()
            const res = await axios.get(`${API}/api/exercises`, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })
            this.exercises = res.data
        },
        async addExercise(name: string) {
            const auth = useAuthStore()
            await axios.post(`${API}/api/exercises`, { name }, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })
            await this.fetchExercises()
        },
        async deleteExercise(id: string) {
            const auth = useAuthStore()
            await axios.delete(`${API}/api/exercises/${id}`, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })
            await this.fetchExercises()
        },
        async fetchLogs(exerciseId: string) {
            const auth = useAuthStore()
            const res = await axios.get(`${API}/api/exercises/${exerciseId}/logs`, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })
            this.logs = res.data
        },
        async addLog(exerciseId: string, weight: number, reps: number, date: string) {
            const auth = useAuthStore()
            await axios.post(`${API}/api/exercises/${exerciseId}/logs`, { weight, reps, date }, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })
            await this.fetchLogs(exerciseId)
        }
    }
})