import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dimensions: string[] }> }
) {
  const resolvedParams = await params;
  const [width = '800', height = '600'] = resolvedParams.dimensions;
  const w = parseInt(width) || 800;
  const h = parseInt(height) || 600;

  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#1a1a2e"/>
    <text x="50%" y="50%" font-family="Arial,sans-serif" font-size="20"
      fill="#c9a96e" text-anchor="middle" dominant-baseline="middle">
      ${w} × ${h}
    </text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
