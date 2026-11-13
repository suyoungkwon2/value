import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { renderExampleWheel } from '../chart.mjs';

const logo = await readFile(new URL('../assets/value-logo.svg', import.meta.url));
const chart = renderExampleWheel('en')
  .replace(/<path id="group-arc-[\s\S]*?<\/text>/g, '')
  .replace(
    '<svg class="wheel"',
    '<svg xmlns="http://www.w3.org/2000/svg" x="625" y="40" width="540" height="540" font-family="Arial,Helvetica,sans-serif" class="wheel"',
  );
const starPoints = (cx, cy, outer = 11, inner = 4.7) => Array.from({ length: 10 }, (_, i) => {
  const angle = (-90 + i * 36) * Math.PI / 180;
  const radius = i % 2 ? inner : outer;
  return `${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`;
}).join(' ');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f1f7fc"/>
<rect x="32" y="30" width="1136" height="570" rx="30" fill="#fff" stroke="#e3edf6" stroke-width="2"/>
<image x="78" y="64" width="190" height="63" href="data:image/svg+xml;base64,${logo.toString('base64')}"/>
<text x="80" y="184" fill="#62758a" font-family="Arial,Helvetica,sans-serif" font-size="14" font-weight="700" letter-spacing="2.3">A LITTLE SELF-UNDERSTANDING</text>
<text x="78" y="250" fill="#27384c" font-family="Arial,Helvetica,sans-serif" font-size="43" font-weight="700" letter-spacing="-1.2">What matters to you?</text>
<text x="80" y="294" fill="#62758a" font-family="Arial,Helvetica,sans-serif" font-size="19">Discover the values that shape your choices.</text>
<rect x="74" y="350" width="500" height="148" rx="22" fill="#f1f7fc"/>
<text x="98" y="384" fill="#62758a" font-family="Arial,Helvetica,sans-serif" font-size="12" font-weight="700" letter-spacing="1.8">EXAMPLE PROFILE</text>
<polygon points="${starPoints(107, 421)}" fill="#f3cf58" stroke="#8a6d22" stroke-width="1.4" stroke-linejoin="round"/>
<text x="130" y="427" fill="#2d4057" font-family="Arial,Helvetica,sans-serif" font-size="16" font-weight="600">Self-direction · Benevolence · Achievement</text>
<path d="M 101 453 L 113 465 M 113 453 L 101 465" fill="none" stroke="#697c99" stroke-width="3" stroke-linecap="round"/>
<text x="130" y="466" fill="#2d4057" font-family="Arial,Helvetica,sans-serif" font-size="16" font-weight="600">Hedonism · Power</text>
<text x="80" y="550" fill="#78899b" font-family="Arial,Helvetica,sans-serif" font-size="13">An illustration, not a visitor’s result.</text>
<rect x="614" y="52" width="540" height="526" rx="24" fill="#f9fbfe" stroke="#e7eff7" stroke-width="1.5"/>
${chart}
<text x="884" y="596" text-anchor="middle" fill="#62758a" font-family="Arial,Helvetica,sans-serif" font-size="11" font-weight="700" letter-spacing="1.4">SCHWARTZ VALUES CIRCLE · EXAMPLE</text>
</svg>`;

const svgPath = new URL('../assets/og-image.svg', import.meta.url).pathname;
const pngPath = new URL('../assets/og-image.png', import.meta.url).pathname;
const moduleCache = join(tmpdir(), 'myvalue-swift-module-cache');
await mkdir(moduleCache, { recursive: true });
await writeFile(svgPath, svg);
execFileSync('swift', ['-module-cache-path', moduleCache, new URL('./render-svg.swift', import.meta.url).pathname, svgPath, pngPath], { stdio: 'inherit' });
console.log('Generated assets/og-image.svg and assets/og-image.png (1200×630).');
