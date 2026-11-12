import { localizeResult, localizeValues } from './i18n.mjs';

// Fixed theoretical regions: conformity and tradition share an angular wedge.
// Score ranks affect icons, never the size, position, or radius of a region.
export const CHART_ORDER = ['self-direction','universalism','benevolence','tradition','conformity','security','power','achievement','hedonism','stimulation'];
export const REGIONS = [
  {id:'self-direction',start:232,end:270,inner:0,outer:230,label:[166,251],marker:[112,251]},
  {id:'universalism',start:270,end:312,inner:0,outer:230,label:[166,291],marker:[112,291]},
  {id:'benevolence',start:312,end:346,inner:0,outer:230,label:[174,329],marker:[112,329]},
  {id:'tradition',start:346,end:398,inner:160,outer:230,label:[197,3],marker:[197,25]},
  {id:'conformity',start:346,end:398,inner:0,outer:160,label:[110,18],marker:[109,-4]},
  {id:'security',start:38,end:90,inner:0,outer:230,label:[173,64],marker:[112,64]},
  {id:'power',start:90,end:132,inner:0,outer:230,label:[171,111],marker:[112,111]},
  {id:'achievement',start:132,end:165,inner:0,outer:230,label:[167,148.5],marker:[112,148.5]},
  {id:'hedonism',start:165,end:200,inner:0,outer:230,label:[175,182.5],marker:[112,182.5]},
  {id:'stimulation',start:200,end:232,inner:0,outer:230,label:[166,216],marker:[112,216]},
];
const point=(radius,angle)=>[300+radius*Math.cos(angle*Math.PI/180),300+radius*Math.sin(angle*Math.PI/180)];
const arc=(radius,start,end,sweep=1)=>{const a=point(radius,start),b=point(radius,end);return `M ${a.join(' ')} A ${radius} ${radius} 0 0 ${sweep} ${b.join(' ')}`;};
function regionPath({start,end,inner,outer}) {
  const a=point(outer,start),b=point(outer,end);
  if(!inner) return `M 300 300 L ${a.join(' ')} A ${outer} ${outer} 0 0 1 ${b.join(' ')} Z`;
  const c=point(inner,end),d=point(inner,start);
  return `M ${a.join(' ')} A ${outer} ${outer} 0 0 1 ${b.join(' ')} L ${c.join(' ')} A ${inner} ${inner} 0 0 0 ${d.join(' ')} Z`;
}
export function selectPriorities(result) {
  const ordered=CHART_ORDER.map(id=>result.values.find(value=>value.id===id));
  if(ordered.some(value=>!value||!Number.isFinite(value.raw))) throw new TypeError('A scored ten-value profile is required.');
  const descending=[...ordered].sort((a,b)=>b.raw-a.raw);
  const ascending=[...ordered].sort((a,b)=>a.raw-b.raw);
  const equal=(a,b)=>Math.abs(a.raw-b.raw)<1e-10;
  const flat=equal(descending[0],descending[9]);
  if(flat) return {highest:[],lowest:[],flat:true,tied:false};
  const highest=descending.slice(0,3).map(value=>value.id);
  const lowest=ascending.filter(value=>!highest.includes(value.id)).slice(0,3).map(value=>value.id);
  return {highest,lowest,flat:false,tied:equal(descending[2],descending[3])||equal(ascending[2],ascending[3])};
}
function star(x,y){const points=Array.from({length:10},(_,i)=>{const angle=(-90+i*36)*Math.PI/180,r=i%2?5.4:12;return `${x+r*Math.cos(angle)},${y+r*Math.sin(angle)}`;});return `<polygon points="${points.join(' ')}" fill="#f3cf58" stroke="#8a6d22" stroke-width="1.3" stroke-linejoin="round"/>`;}
function cross(x,y){return `<path d="M ${x-7} ${y-7} L ${x+7} ${y+7} M ${x+7} ${y-7} L ${x-7} ${y+7}" fill="none" stroke="#697c99" stroke-width="3" stroke-linecap="round"/>`;}
export function renderWheel(result,lang='en') {
  if(!result||result.values.length!==10) throw new TypeError('A scored ten-value profile is required.');
  return renderDiagram(localizeResult(result,lang).values,selectPriorities(result),lang);
}
export function renderExampleWheel(lang='en') {
  // User-supplied example priorities only: no invented scores or third low value.
  return renderDiagram(localizeValues(lang),{
    highest:['self-direction','benevolence','achievement'],
    lowest:['hedonism','power'],
  },lang,true);
}
function renderDiagram(values,ranking,lang,example=false) {
  // Higher priorities retain group colors; neutral fills fade and lower priorities use gray.
  const palette={
    'self-direction':'#f3efbd',stimulation:'#f3efbd',
    universalism:'#c9dff4',benevolence:'#c9dff4',
    tradition:'#edd0e2',conformity:'#edd0e2',security:'#edd0e2',
    power:'#cbe8de',achievement:'#cbe8de',
    hedonism:'url(#hedonism-palette)',
  };
  const regions=REGIONS.map(region=>{
    const value=values.find(value=>value.id===region.id),high=ranking.highest.includes(region.id),low=ranking.lowest.includes(region.id);
    const label=point(...region.label),marker=point(...region.marker);
    const lines=value.name==='Self-direction'?['Self-','direction']:[value.name];
    const iconLabel=lang==='ko'?(high?`높은 ${ranking.highest.length}가지`:low?`낮은 ${ranking.lowest.length}가지`:''):(high?`Higher ${ranking.highest.length} priorities`:low?`Lower ${ranking.lowest.length} priorities`:'');
    return `<g data-value="${region.id}"><path d="${regionPath(region)}" fill="${low?'#dfe5ec':palette[region.id]}" fill-opacity="${high||low?1:0.2}" stroke="#8292a6" stroke-width="1"/><text x="${label[0]}" y="${label[1]-(lines.length-1)*8}" text-anchor="middle" dominant-baseline="middle" font-size="${lang==='ko'?17:15}" fill="#2d4057">${lines.map((line,i)=>`<tspan x="${label[0]}" dy="${i?17:0}">${line}</tspan>`).join('')}</text>${high||low?`<g data-priority="${high?'highest':'lowest'}" role="img" aria-label="${value.name}: ${iconLabel}"><title>${value.name}: ${iconLabel}</title>${high?star(...marker):cross(...marker)}</g>`:''}</g>`;
  }).join('');
  const groups=lang==='ko'?['변화에 대한 개방성','자기초월','보수성','자기증진']:['Openness to Change','Self-Transcendence','Conservation','Self-Enhancement'];
  const paths=[arc(263,202,267),arc(263,273,345),arc(263,85,5,0),arc(263,162,95,0)];
  const groupLabels=paths.map((path,i)=>`<path id="group-arc-${i}" d="${path}" fill="none"/><text font-size="${lang==='ko'?17:16}" fill="#42566f" letter-spacing=".2"><textPath href="#group-arc-${i}" startOffset="50%" text-anchor="middle">${groups[i]}</textPath></text>`).join('');
  const edge=point(251,346);
  const title=example?(lang==='ko'?'가치관 예시 지도':'Example values circle'):(lang==='ko'?'나의 가치관 원형 지도':'Your values circle');
  const description=example?(lang==='ko'?'예시 차트입니다. 별은 자기주도, 자애, 성취에, X는 쾌락과 권력에 표시되어 있습니다. 수치 점수나 방문자의 검사 결과를 나타내지 않습니다.':'An illustrative example: stars mark Self-direction, Benevolence, and Achievement; X icons mark Hedonism and Power. No numeric scores or visitor test results are represented.'):(lang==='ko'?'슈워츠의 이론 모형과 같이 전통과 동조가 같은 부채꼴의 바깥과 안쪽을 나눕니다. 별은 표시된 상위 세 가치, X는 표시된 하위 세 가치입니다. 구역의 크기는 점수를 뜻하지 않습니다. 동점 처리와 정확한 점수는 아래에서 확인할 수 있습니다.':'A fixed theoretical circle with tradition outside conformity in their shared wedge. Stars mark the displayed top three values; X icons mark the displayed bottom three. Region sizes do not represent scores. Tie handling and exact scores are explained below.');
  return `<svg class="wheel" viewBox="0 0 600 600" role="img" aria-labelledby="profile-title profile-desc"><title id="profile-title">${title}</title><desc id="profile-desc">${description}</desc><defs><linearGradient id="hedonism-palette" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f3efbd"/><stop offset="100%" stop-color="#cbe8de"/></linearGradient></defs>${regions}<path d="M 300 50 V 550 M 50 300 H 86 M 184 300 H 300 L ${edge.join(' ')}" stroke="#42566f" stroke-width="2" fill="none"/>${groupLabels}</svg>`;
}
