<template>
    <div class="min-h-screen bg-gray-950 p-8">
        <div class="max-w-2xl mx-auto">

            <div class="flex justify-between items-center mb-8">
                <h1 class="text-white text-3xl font-bold">Exercise Tracker</h1>
                <router-link to="/workouts" class="text-gray-400 hover:text-white text-sm border border-gray-700 px-4 py-2 rounded-lg">Back</router-link>
            </div>

            <!-- add exercise -->
            <div class="bg-gray-900 rounded-2xl p-6 mb-6">
                <h2 class="text-white font-semibold mb-4">Add Exercise</h2>
                <div class="flex gap-3">
                    <input v-model="newExerciseName" placeholder="e.g. Bench Press" class="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg outline-none" />
                    <button @click="addExercise" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Add</button>
                </div>
            </div>

            <!-- exercise list -->
            <div v-for="exercise in store.exercises" :key="exercise._id" class="bg-gray-900 rounded-2xl p-5 mb-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-white font-semibold text-lg cursor-pointer" @click="selectExercise(exercise)">
                        {{ exercise.name }}
                        <span class="text-gray-500 text-sm ml-2">click to track</span>
                    </h3>
                    <button @click="store.deleteExercise(exercise._id)" class="text-red-400 hover:text-red-300 text-sm border border-red-900 px-3 py-1 rounded-lg">Delete</button>
                </div>

                <!-- logs for exercise -->
                <div v-if="selectedExercise && selectedExercise._id === exercise._id">

                    <!-- add log -->
                    <div class="flex gap-2 mb-4 flex-wrap">
                        <input v-model="logWeight" type="number" placeholder="Weight (kg)" class="bg-gray-800 text-white px-3 py-2 rounded-lg outline-none w-36" />
                        <input v-model="logReps" type="number" placeholder="Reps" class="bg-gray-800 text-white px-3 py-2 rounded-lg outline-none w-24" />
                        <input v-model="logDate" type="date" class="bg-gray-800 text-white px-3 py-2 rounded-lg outline-none" />
                        <button @click="addLog(exercise._id)" class="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg">Log</button>
                    </div>

                    <!-- chart -->
                    <canvas :id="'chart-' + exercise._id" class="mb-4"></canvas>

                    <!-- log history -->
                    <div v-for="log in store.logs" :key="log._id" class="flex justify-between text-sm text-gray-400 border-b border-gray-800 py-2">
                        <span>{{ new Date(log.date).toLocaleDateString() }}</span>
                        <span>{{ log.weight }} kg</span>
                        <span>{{ log.reps }} reps</span>
                    </div>

                    <p v-if="store.logs.length > 1" class="text-green-400 text-sm mt-3">
                        Progress: {{ progressPercent }}% since first log
                    </p>
                </div>
            </div>

            <div v-if="store.exercises.length === 0" class="text-gray-500 text-center py-12">No exercises yet. Add one above!</div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useExerciseStore } from '../stores/exercises'
import Chart from 'chart.js/auto'

const store = useExerciseStore()
const newExerciseName = ref('')
const selectedExercise = ref<any>(null)
const logWeight = ref(0)
const logReps = ref(0)
const logDate = ref(new Date().toISOString().split('T')[0])
let chartInstance: any = null

onMounted(() => {
    store.fetchExercises()
})

async function addExercise() {
    if (!newExerciseName.value) return
    await store.addExercise(newExerciseName.value)
    newExerciseName.value = ''
}

async function selectExercise(exercise: any) {
    selectedExercise.value = exercise
    await store.fetchLogs(exercise._id)
    await nextTick()
    renderChart(exercise._id)
}

async function addLog(exerciseId: string) {
    await store.addLog(exerciseId, logWeight.value, logReps.value, logDate.value)
    renderChart(exerciseId)
}

function renderChart(exerciseId: string) {
    const canvas = document.getElementById('chart-' + exerciseId) as HTMLCanvasElement
    if (!canvas) return

    if (chartInstance) chartInstance.destroy()

    const labels = store.logs.map(l => new Date(l.date).toLocaleDateString())
    const data = store.logs.map(l => l.weight)

    chartInstance = new Chart(canvas, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Weight (kg)',
                data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            plugins: { legend: { labels: { color: '#9ca3af' } } },
            scales: {
                x: { ticks: { color: '#9ca3af' }, grid: { color: '#1f2937' } },
                y: { ticks: { color: '#9ca3af' }, grid: { color: '#1f2937' } }
            }
        }
    })
}

const progressPercent = computed(() => {
    if (store.logs.length < 2) return 0
    const first = store.logs[0].weight
    const last = store.logs[store.logs.length - 1].weight
    return ((last - first) / first * 100).toFixed(1)
})
</script>