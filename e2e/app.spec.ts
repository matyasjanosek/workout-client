import { test, expect } from '@playwright/test'

test('login page loads', async ({ page }) => {
    await page.goto('https://deluxe-taiyaki-6e4f15.netlify.app', { timeout: 60000 })
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
})

test('register new user and login', async ({ page }) => {
    await page.goto('https://deluxe-taiyaki-6e4f15.netlify.app/register', { timeout: 60000 })
    await page.fill('input[placeholder="Username"]', 'playwrightuser5')
    await page.fill('input[placeholder="Password"]', 'test123')
    await page.click('button')
    await expect(page.getByText('Registered')).toBeVisible({ timeout: 60000 })
})

test('login redirects to workouts page', async ({ page }) => {
    await page.goto('https://deluxe-taiyaki-6e4f15.netlify.app', { timeout: 60000 })
    await page.fill('input[placeholder="Username"]', 'playwrightuser5')
    await page.fill('input[placeholder="Password"]', 'test123')
    await page.click('button')
    await expect(page.getByRole('heading', { name: 'My Workouts' })).toBeVisible({ timeout: 60000 })
})