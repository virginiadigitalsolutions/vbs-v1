const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Seeding Legal pages...')

    const pages = [
        {
            title: 'Terms & Conditions',
            slug: 'terms-and-conditions',
            metaDesc: 'Standard terms and conditions for Virginia Business Solutions.',
            sections: [
                {
                    type: 'hero',
                    order: 0,
                    data: {
                        tag: "Legal documentation",
                        heading: "Terms & Conditions",
                        subheading: "Last Updated: 25-02-2026. By accessing and using this website, you agree to the following terms.",
                    }
                },
                {
                    type: 'text',
                    order: 1,
                    data: {
                        body: `
<h3>1. Nature of Service</h3>
<p>Virginia Business Solutions operates as a digital informational guidance platform.</p>
<p>We provide structured guidance related to digital skills, courses, certifications, and career pathways. We are not a job placement agency, recruitment firm, or employment provider.</p>
<p>We do not guarantee job offers, income outcomes, or career placement.</p>
<p>If any individual claims to represent this platform and requests payment in exchange for job placement or employment opportunities, such claims are unauthorized and fraudulent.</p>
<p>Users are advised not to make payments based on such representations.</p>

<h3>2. Informational Purpose</h3>
<p>All content provided on this website is for informational purposes only.</p>
<p>While we strive to provide accurate and updated information, users must independently verify course details, certification validity, fees, and career claims before making decisions.</p>
<p>Parents and guardians are encouraged to review learning choices made by minors.</p>

<h3>3. No Professional Liability</h3>
<p>We make reasonable efforts to provide structured and research-based guidance. However, we are not responsible for:</p>
<ul>
    <li>Decisions made based on website content</li>
    <li>Financial investments in third-party programs</li>
    <li>Outcomes from courses or certifications</li>
</ul>
<p>Users assume responsibility for their decisions.</p>

<h3>4. Affiliate Link Disclosure</h3>
<p>Some links on this platform may be affiliate or referral links. We may earn commissions from third-party providers if users choose to enroll through those links.</p>
<p>Such relationships do not constitute endorsement or guarantee of outcomes.</p>

<h3>5. User Conduct and Responsibility</h3>
<p>Users agree to:</p>
<ul>
    <li>Provide accurate information when contacting us</li>
    <li>Use this platform for lawful purposes</li>
    <li>Independently evaluate learning and career decisions</li>
</ul>

<h3>6. Limitation of Liability Clause</h3>
<p>Virginia Business Solutions shall not be liable for any direct or indirect damages resulting from the use of this website or third-party services.</p>

<h3>7. Policy Modifications</h3>
<p>We reserve the right to update these Terms & Conditions at any time without prior notice.</p>
<p>Continued use of the website constitutes acceptance of any updates.</p>
`
                    }
                }
            ]
        },
        {
            title: 'Privacy Policy',
            slug: 'privacy-policy',
            metaDesc: 'Privacy policy for Virginia Business Solutions detailing data collection and protection.',
            sections: [
                {
                    type: 'hero',
                    order: 0,
                    data: {
                        tag: "Legal documentation",
                        heading: "Privacy Policy",
                        subheading: "Last Updated: 25-02-2026. Virginia Business Solutions operates as a digital informational guidance provider. This explains how we collect, use, and protect your information.",
                    }
                },
                {
                    type: 'text',
                    order: 1,
                    data: {
                        body: `
<h3>1. Information Collection</h3>
<p>We may collect:</p>
<ul>
    <li>Name</li>
    <li>Email address</li>
    <li>Information submitted through contact forms</li>
    <li>Technical data such as browser type, device information, and usage analytics</li>
</ul>
<p>We do not collect sensitive financial information directly through this website.</p>

<h3>2. Data Usage and Purpose</h3>
<p>We use collected information to:</p>
<ul>
    <li>Respond to queries</li>
    <li>Improve website content and user experience</li>
    <li>Analyze usage patterns</li>
    <li>Provide relevant informational content</li>
</ul>
<p>Some links on this platform may direct users to third-party learning providers. If you choose to engage with those platforms, their privacy policies and data practices apply.</p>

<h3>3. Referral Disclosure</h3>
<p>This website may contain referral or affiliate links to third-party platforms. If users choose to enroll in programs through such links, we may earn a commission at no additional cost to the user.</p>
<p>Our recommendations are structured around skill alignment and learning progression. However, users are encouraged to independently verify all program details before making decisions.</p>

<h3>4. Security Measures</h3>
<p>We take reasonable measures to protect user information. However, no digital platform can guarantee complete security.</p>

<h3>5. Minor Protection Policy</h3>
<p>This platform is not intended for independent use by individuals under 18 years of age.</p>
<p>If you are a minor, a parent or legal guardian must provide consent before submitting any personal information through this website.</p>
<p>Parents and guardians are encouraged to review all learning decisions independently.</p>

<h3>6. External Website Links</h3>
<p>Our website may contain links to external platforms. We are not responsible for the privacy practices or content of those websites.</p>

<h3>7. Data Privacy Contact</h3>
<p>For privacy-related questions, please contact: <strong>contact@virginiabusinesssolutions.in</strong></p>
`
                    }
                }
            ]
        }
    ]

    for (const pageData of pages) {
        let page = await prisma.page.findUnique({
            where: { slug: pageData.slug }
        })

        if (page) {
            console.log(pageData.title + ' page exists. Deleting for a clean reinstall...')
            await prisma.page.delete({
                where: { id: page.id }
            })
        }
        
        console.log('Creating fresh ' + pageData.title + ' page...')
        await prisma.page.create({
            data: {
                title: pageData.title,
                slug: pageData.slug,
                metaDesc: pageData.metaDesc,
                sections: {
                    create: pageData.sections
                }
            }
        })
        console.log('Successfully reinstalled ' + pageData.title + '!')
    }

    console.log('Legal pages seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
