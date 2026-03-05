<template>
    <div class="min-h-screen bg-gray-950 flex items-center justify-center">
        <div class="bg-gray-900 p-8 rounded-2xl w-full max-w-sm">
            <h1 class="text-white text-2xl font-bold mb-6">Login</h1>
            <input v-model="username" placeholder="Username" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-3 outline-none" />
            <input v-model="password" type="password" placeholder="Password" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-4 outline-none" />
            <button @click="login" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">Login</button>
            <p v-if="error" class="text-red-400 text-sm mt-3">{{ error }}</p>
            <p class="text-gray-400 text-sm mt-4">No account? <router-link to="/register" class="text-blue-400">Register</router-link></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

async function login() {
    try {
        await auth.login(username.value, password.value)
        router.push('/workouts')
    } catch (e) {
        error.value = 'Wrong credentials'
    }
}
</script>