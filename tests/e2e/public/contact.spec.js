const { test, expect } = require('@playwright/test')

test.describe('Public Contact', () => {
    test('contact page renders the contact form', async ({ page }) => {
        await page.goto('/contact', { waitUntil: 'domcontentloaded' })

        await expect(page).toHaveURL(/\/contact$/)
        await expect(page.getByRole('heading', { name: /send a message/i })).toBeVisible()
        await expect(page.getByPlaceholder(/john doe/i)).toBeVisible()
        await expect(page.getByPlaceholder(/you@example.com/i)).toBeVisible()
        await expect(page.getByRole('combobox')).toBeVisible()
        await expect(page.getByPlaceholder(/tell us more about your inquiry/i)).toBeVisible()
        await expect(page.getByRole('button', { name: /send message/i })).toBeVisible()
    })
})
