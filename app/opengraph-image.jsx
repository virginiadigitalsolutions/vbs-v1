import { ImageResponse } from 'next/og'

// Default social/AI preview image for every page that doesn't set its own.
export const alt = 'Virginia Business Solutions — Job-ready digital skills & career guidance in India'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '72px 80px',
                    background: 'linear-gradient(135deg, #0f2a4a 0%, #4873AE 60%, #5fb3c9 100%)',
                    color: 'white',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: 18,
                            background: 'white',
                            color: '#4873AE',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 32,
                            fontWeight: 800,
                        }}
                    >
                        VBS
                    </div>
                    <div style={{ fontSize: 30, fontWeight: 600, opacity: 0.95 }}>Virginia Business Solutions</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>Job-Ready Digital Skills</div>
                    <div style={{ fontSize: 32, opacity: 0.9, lineHeight: 1.35 }}>
                        Career guides, courses &amp; roadmaps for students and professionals in India
                    </div>
                </div>
                <div style={{ fontSize: 26, opacity: 0.85 }}>virginiabusinesssolutions.in</div>
            </div>
        ),
        size
    )
}
