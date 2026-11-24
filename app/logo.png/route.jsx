import { ImageResponse } from 'next/og'

// Served at /logo.png — used as the Organization logo in structured data
// when no logo is set in Site Settings (Google requires >= 112x112).
const size = { width: 512, height: 512 }

export function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#4873AE',
                    color: 'white',
                    fontSize: 200,
                    fontWeight: 800,
                    fontFamily: 'sans-serif',
                    borderRadius: 96,
                }}
            >
                VBS
            </div>
        ),
        size
    )
}
