const { test, expect } = require('@playwright/test')

test.describe('Public Home', () => {
    test('home page renders global navigation', async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' })

        await expect(page).toHaveURL(/\/$/)
        await expect(page.getByRole('link', { name: /contact us/i }).first()).toBeVisible()
        await expect(page.getByRole('link', { name: /digital skills/i }).first()).toBeVisible()
    })
})
