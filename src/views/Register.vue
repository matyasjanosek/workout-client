<template>
    <div class="min-h-screen bg-gray-950 flex items-center justify-center">
        <div class="bg-gray-900 p-8 rounded-2xl w-full max-w-sm">
            <h1 class="text-white text-2xl font-bold mb-6">Register</h1>
            <input v-model="username" placeholder="Username" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-3 outline-none" />
            <input v-model="password" type="password" placeholder="Password" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-4 outline-none" />
            <button @click="register" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">Register</button>
            <p v-if="message" class="text-green-400 text-sm mt-3">{{ message }}</p>
            <p class="text-gray-400 text-sm mt-4">Already have an account? <router-link to="/" class="text-blue-400">Login</router-link></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const message = ref('')
const auth = useAuthStore()

async function register() {
    try {
        await auth.register(username.value, password.value)
        message.value = 'Registered! Go to login.'
    } catch (e) {
        message.value = 'Something went wrong'
    }
}
</script>