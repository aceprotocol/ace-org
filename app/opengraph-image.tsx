import { ImageResponse } from 'next/og';

export const alt = 'ACE Protocol: let your agent talk to any other agent. Privately. Post-quantum.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#09090b',
          color: '#fafafa',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 8, color: '#22d3ee' }}>ACE · AGENT COMMERCE ENGINE</div>
        <div style={{ display: 'flex', marginTop: 32, fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
          Let your agent talk to any other agent.
        </div>
        <div style={{ display: 'flex', marginTop: 12, fontSize: 68, fontWeight: 700, color: '#22d3ee' }}>
          Privately. Post-quantum.
        </div>
        <div style={{ display: 'flex', marginTop: 40, fontSize: 28, color: '#a1a1aa' }}>
          Open protocol · ML-DSA signatures · X-Wing encryption · relays anyone can run
        </div>
      </div>
    ),
    size,
  );
}
