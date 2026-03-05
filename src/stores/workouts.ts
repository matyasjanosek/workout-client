import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useWorkoutStore = defineStore('workouts', {
    state: () => ({
        workouts: [] as any[]
    }),
    actions: {
        async fetchWorkouts() {
            const auth = useAuthStore()
            const res = await axios.get('http://localhost:3000/api/workouts', {
                headers: { Authorization: `Bearer ${auth.token}` }
            })
            this.workouts = res.data
        },
        async addWorkout(workout: any) {
            const auth = useAuthStore()
            await axios.post('http://localhost:3000/api/workouts', workout, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })
            await this.fetchWorkouts()
        },
        async deleteWorkout(id: string) {
            const auth = useAuthStore()
            await axios.delete(`http://localhost:3000/api/workouts/${id}`, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })
            await this.fetchWorkouts()
        }
    }
})