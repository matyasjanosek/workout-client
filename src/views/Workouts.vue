<template>
    <div class="min-h-screen bg-gray-950 p-8">
        <div class="max-w-2xl mx-auto">

            <div class="flex justify-between items-center mb-8">
                <h1 class="text-white text-3xl font-bold">My Workouts</h1>
                <div class="flex gap-2">
                    <router-link to="/exercises" class="text-gray-400 hover:text-white text-sm border border-gray-700 px-4 py-2 rounded-lg">Exercise Tracker</router-link>
                    <button @click="logout" class="text-gray-400 hover:text-white text-sm border border-gray-700 px-4 py-2 rounded-lg">Logout</button>
                </div>
            </div>

            <div class="bg-gray-900 rounded-2xl p-6 mb-6">
                <h2 class="text-white font-semibold mb-4">Add Workout</h2>
                <div class="grid grid-cols-2 gap-3 mb-3">
                    <input v-model="title" placeholder="Title" class="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none" />
                    <input v-model="description" placeholder="Description" class="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none" />
                    <input v-model="duration" type="number" placeholder="Duration (min)" class="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none" />
                    <select v-model="difficulty" class="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none">
                        <option>easy</option>
                        <option>medium</option>
                        <option>hard</option>
                    </select>
                </div>
                <button @click="addWorkout" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">Add Workout</button>
            </div>

            <div v-if="store.workouts.length === 0" class="text-gray-500 text-center py-12">No workouts yet.</div>

            <div v-for="workout in store.workouts" :key="workout._id" class="bg-gray-900 rounded-2xl p-5 mb-3 flex justify-between items-center">
                <div>
                    <h3 class="text-white font-semibold">{{ workout.title }}</h3>
                    <p class="text-gray-400 text-sm mb-2">{{ workout.description }}</p>
                    <div class="flex gap-2">
                        <span class="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full">{{ workout.duration }} min</span>
                        <span class="text-xs px-3 py-1 rounded-full"
                            :class="{
                                'bg-green-900 text-green-400': workout.difficulty === 'easy',
                                'bg-yellow-900 text-yellow-400': workout.difficulty === 'medium',
                                'bg-red-900 text-red-400': workout.difficulty === 'hard'
                            }">
                            {{ workout.difficulty }}
                        </span>
                    </div>
                </div>
                <button @click="store.deleteWorkout(workout._id)" class="text-red-400 hover:text-red-300 text-sm border border-red-900 px-4 py-2 rounded-lg">Delete</button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkoutStore } from '../stores/workouts'
import { useAuthStore } from '../stores/auth'

const store = useWorkoutStore()
const auth = useAuthStore()
const router = useRouter()

const title = ref('')
const description = ref('')
const duration = ref(0)
const difficulty = ref('medium')

onMounted(() => {
    store.fetchWorkouts()
})

async function addWorkout() {
    await store.addWorkout({
        title: title.value,
        description: description.value,
        duration: duration.value,
        difficulty: difficulty.value
    })
    title.value = ''
    description.value = ''
    duration.value = 0
}

function logout() {
    auth.logout()
    router.push('/')
}
</script>