import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CHART_ORDER,REGIONS,selectPriorities,renderWheel,renderExampleWheel } from '../chart.mjs';
import { score } from '../values.mjs';

test('theory circle keeps conformity inside tradition in one shared wedge',()=>{
  assert.equal(REGIONS.length,10);
  assert.equal(new Set(REGIONS.map(r=>r.id)).size,10);
  const tradition=REGIONS.find(r=>r.id==='tradition'),conformity=REGIONS.find(r=>r.id==='conformity');
  assert.equal(tradition.start,conformity.start);
  assert.equal(tradition.end,conformity.end);
  assert.equal(conformity.inner,0);
  assert.equal(conformity.outer,tradition.inner);
  assert.equal(tradition.outer,230);
  assert.deepEqual(REGIONS.map(r=>r.id),CHART_ORDER);
});
test('exactly three highest and three lowest receive distinct icons',()=>{
  const result=score([0,1,2,3,4,5,6,7,8,4]);
  const ranking=selectPriorities(result);
  assert.deepEqual(ranking.highest,['conformity','tradition','benevolence']);
  assert.deepEqual(ranking.lowest,['power','achievement','hedonism']);
  assert.equal(new Set([...ranking.highest,...ranking.lowest]).size,6);
  assert.equal(ranking.tied,false);
  const svg=renderWheel(result);
  assert.equal((svg.match(/data-priority="highest"/g)||[]).length,3);
  assert.equal((svg.match(/data-priority="lowest"/g)||[]).length,3);
  assert.ok(!svg.includes('NaN'));
});
test('ties at cutoffs use deterministic diagram order with a tie flag',()=>{
  const result=score([1,1,1,1,7,7,7,7,1,1]);
  const ranking=selectPriorities(result);
  assert.equal(ranking.tied,true);
  assert.deepEqual(ranking.highest,['self-direction','universalism','benevolence']);
  assert.equal(new Set([...ranking.highest,...ranking.lowest]).size,6);
  const flat=selectPriorities(score(Array(10).fill(4)));
  assert.deepEqual(flat,{highest:[],lowest:[],flat:true,tied:false});
  assert.ok(!renderWheel(score(Array(10).fill(4))).includes('data-priority='));
});
test('region geometry stays fixed as scores and language change',()=>{
  const a=renderWheel(score([0,1,2,3,4,5,6,7,8,4]));
  const b=renderWheel(score([8,7,6,5,4,3,2,1,0,4]),'ko');
  const regions=svg=>Array.from(svg.matchAll(/<g data-value="([^"]+)"><path d="([^"]+)"/g),m=>[m[1],m[2]]);
  assert.deepEqual(regions(a),regions(b));
  assert.match(b,/보편주의/);
  assert.match(b,/자기초월/);
  assert.ok(!a.includes('stroke-dasharray'));
});
test('home example shows only the supplied three higher and two lower values',()=>{
  for(const lang of ['en','ko']) {
    const svg=renderExampleWheel(lang);
    const groups=Array.from(svg.matchAll(/<g data-value="([^"]+)">([\s\S]*?)(?=<g data-value=|<path d="M 300 50)/g),m=>({id:m[1],body:m[2]}));
    assert.deepEqual(groups.filter(g=>g.body.includes('data-priority="highest"')).map(g=>g.id),['self-direction','benevolence','achievement']);
    assert.deepEqual(groups.filter(g=>g.body.includes('data-priority="lowest"')).map(g=>g.id),['power','hedonism']);
    assert.match(svg,lang==='ko'?/가치관 예시 지도/:/Example values circle/);
    assert.ok(!svg.includes('NaN'));
    assert.ok(!svg.includes('Tie handling'));
  }
});
