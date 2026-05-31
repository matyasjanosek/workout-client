import { test, expect } from '@playwright/test'

test('login page loads', async ({ page }) => {
    await page.goto('https://deluxe-taiyaki-6e4f15.netlify.app', { timeout: 60000 })
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
})

test('register and login with new user', async ({ page }) => {
    const username = `pwuser${Date.now()}`
    const password = 'test123'

    // register
    await page.goto('https://deluxe-taiyaki-6e4f15.netlify.app/register', { timeout: 60000 })
    await page.fill('input[placeholder="Username"]', username)
    await page.fill('input[placeholder="Password"]', password)
    await page.click('button')
    await expect(page.getByText('Go to login')).toBeVisible({ timeout: 60000 })

    // login with same user
    await page.goto('https://deluxe-taiyaki-6e4f15.netlify.app', { timeout: 60000 })
    await page.fill('input[placeholder="Username"]', username)
    await page.fill('input[placeholder="Password"]', password)
    await page.click('button')
    await expect(page.getByRole('heading', { name: 'My Workouts' })).toBeVisible({ timeout: 60000 })
})