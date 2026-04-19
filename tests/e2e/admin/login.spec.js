const { test, expect } = require('@playwright/test')

test.describe('Admin Login', () => {
    test('admin login page renders authentication form', async ({ page }) => {
        await page.goto('/admin/login', { waitUntil: 'domcontentloaded' })

        await expect(page).toHaveURL(/\/admin\/login$/)
        await expect(page.getByRole('heading', { name: /vbs admin/i })).toBeVisible()
        await expect(page.getByPlaceholder(/admin@vbs.com/i)).toBeVisible()
        await expect(page.locator('input[type="password"]')).toBeVisible()
        await expect(page.getByRole('button', { name: /secure login|authenticating/i })).toBeVisible()
    })
})
