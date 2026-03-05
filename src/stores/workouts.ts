import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

const API = 'https://workout-api-q9v4.onrender.com'

export const useWorkoutStore = defineStore('workouts', {
    state: () => ({
        workouts: [] as any[]
    }),
    actions: {
        async fetchWorkouts() {
            const auth = useAuthStore()
            const res = await axios.get(`${API}/api/workouts`, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })
            this.workouts = res.data
        },
        async addWorkout(workout: any) {
            const auth = useAuthStore()
            await axios.post(`${API}/api/workouts`, workout, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })
            await this.fetchWorkouts()
        },
        async deleteWorkout(id: string) {
            const auth = useAuthStore()
            await axios.delete(`${API}/api/workouts/${id}`, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })
            await this.fetchWorkouts()
        }
    }
})