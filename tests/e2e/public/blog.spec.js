const { test, expect } = require('@playwright/test')

test.describe('Public Learning Hub', () => {
    test('learning hub index loads with search and category UI', async ({ page }) => {
        await page.goto('/learning-hub', { waitUntil: 'domcontentloaded' })

        await expect(page).toHaveURL(/\/learning-hub$/)
        await expect(page.getByRole('heading', { name: /search the learning hub and dive into the latest build notes/i })).toBeVisible()
        await expect(page.getByPlaceholder(/search the learning hub/i)).toBeVisible()
        await expect(page.getByText(/categories/i).first()).toBeVisible()
    })
})
