import { test } from 'node:test';
import assert from 'node:assert/strict';
import { VALUES, SURVEYS, SVS_KEY, score, encodeResult, decodeResult } from '../values.mjs';

test('SSVS ordering and centered scoring preserve all ten dimensions', () => {
  assert.equal(VALUES.length, 10);
  const result = score([0,1,2,3,4,5,6,7,8,4]);
  assert.equal(result.mean, 4);
  assert.deepEqual(result.highest, ['conformity']);
  assert.deepEqual(result.lowest, ['power']);
  assert.equal(result.values[0].centered, -4);
  assert.equal(result.values[8].centered, 4);
  assert.equal(result.values.reduce((sum, v) => sum + v.centered, 0), 0);
});
test('ties are preserved and uniform responses do not invent a winner', () => {
  const tied = score([8,8,4,4,4,4,4,4,0,0]);
  assert.deepEqual(tied.highest, ['power','achievement']);
  assert.deepEqual(tied.lowest, ['conformity','security']);
  for (const value of [0,4,8]) assert.equal(score(Array(10).fill(value)).flat, true);
});
test('incomplete, nonnumeric, fractional, and out-of-range scores are rejected', () => {
  for (const bad of [[], Array(10), Array(9).fill(4), Array(10).fill(null), Array(10).fill('4'), Array(10).fill(9), Array(10).fill(-1), Array(10).fill(1.5)]) assert.throws(() => score(bad));
});
test('sparse arrays cannot bypass complete-answer validation', () => {
  const missing = Array(10);
  const oneMissing = Array(10).fill(4);
  delete oneMissing[5];
  assert.throws(() => score(missing));
  assert.throws(() => score(oneMissing));
});
test('share links survive Unicode and preserve raw answers exactly', () => {
  const answers = [0,1,2,3,4,5,6,7,8,4];
  const nickname = '별빛 🌱 & <Alex>';
  assert.deepEqual(decodeResult(encodeResult(nickname, answers)), {nickname,answers,version:'short'});
});
test('original SVS has all 57 items and the supplied 46-item individual key', () => {
  assert.equal(SURVEYS.detailed.items.length,57);
  assert.deepEqual(SURVEYS.detailed.items.map(v=>v.id), Array.from({length:57},(_,i)=>i+1));
  assert.equal(SURVEYS.detailed.items[56].name,'Self-indulgent');
  const items=Object.values(SVS_KEY).flat();
  assert.equal(items.length,46);
  assert.equal(new Set(items).size,46);
});
test('detailed SVS averages indexed items and centers on all 57 responses', () => {
  const answers=Array(57).fill(0);
  for (const item of [5,16,31,41,53]) answers[item-1]=7;
  answers[1]=-1; // Unindexed inner harmony still affects the personal mean.
  const result=score(answers,'detailed');
  assert.equal(result.mean,34/57);
  assert.equal(result.values.find(v=>v.id==='self-direction').raw,7);
  assert.equal(result.values.find(v=>v.id==='self-direction').centered,7-34/57);
  assert.deepEqual(result.highest,['self-direction']);
  assert.equal(result.min,-1);
  assert.equal(result.max,7);
});
test('detailed scale boundaries, fractional means, ties, and share roundtrip', () => {
  assert.equal(score(Array(57).fill(-1),'detailed').flat,true);
  assert.equal(score(Array(57).fill(7),'detailed').flat,true);
  assert.throws(()=>score(Array(57).fill(8),'detailed'));
  assert.throws(()=>score(Array(10).fill(4),'detailed'));
  assert.throws(()=>score(Array(57).fill(4),'unknown'));
  const answers=Array(57).fill(0); answers[2]=1;
  assert.equal(score(answers,'detailed').values[0].raw,.25);
  assert.deepEqual(decodeResult(encodeResult('Alex',answers,'detailed')),{nickname:'Alex',answers,version:'detailed'});
});
test('legacy v1 short links remain readable', () => {
  const answers=Array(10).fill(4);
  assert.deepEqual(decodeResult('#result='+encodeURIComponent(JSON.stringify({v:1,n:'Alex',a:answers}))),{nickname:'Alex',answers});
  assert.equal(decodeResult('#result=null'),null);
});
test('malformed and unsupported share data is rejected', () => {
  for (const bad of ['', '#result=%', '#result={}', '#result=' + encodeURIComponent(JSON.stringify({v:2,n:'Alex',a:Array(10).fill(4)})), '#result=' + 'a'.repeat(2001)]) assert.equal(decodeResult(bad), null);
});
