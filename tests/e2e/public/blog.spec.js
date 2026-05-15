const { test, expect } = require('@playwright/test')

test.describe('Public Learning Hub', () => {
    test('legacy blog URLs return the intended status codes', async ({ request }) => {
        const blogResponse = await request.get('/blog', { maxRedirects: 0 })
        expect(blogResponse.status()).toBe(301)
        expect(blogResponse.headers().location).toContain('/learning-hub')

        const goneResponse = await request.get('/blogs/seo-strategy/', { maxRedirects: 0 })
        expect(goneResponse.status()).toBe(410)
    })

    test('learning hub index loads with search and category UI', async ({ page }) => {
        await page.goto('/learning-hub', { waitUntil: 'domcontentloaded' })

        await expect(page).toHaveURL(/\/learning-hub$/)
        await expect(page.getByRole('heading', { name: /digital career articles, skill guides, and learning resources/i })).toBeVisible()
        await expect(page.getByRole('searchbox')).toBeVisible()
        await expect(page.getByText(/categories/i).first()).toBeVisible()
    })
})
