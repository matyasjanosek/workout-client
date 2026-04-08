import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Workouts from '../views/Workouts.vue'
import Exercises from '../views/Exercises.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Login },
        { path: '/register', component: Register },
        { path: '/workouts', component: Workouts, meta: { requiresAuth: true } },
        { path: '/exercises', component: Exercises, meta: { requiresAuth: true } }
    ]
})

router.beforeEach((to) => {
    const auth = useAuthStore()
    if (to.meta.requiresAuth && !auth.token) {
        return '/'
    }
})

export default router