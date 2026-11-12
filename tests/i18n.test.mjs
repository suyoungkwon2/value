import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SURVEYS,VALUES,score,encodeResult } from '../values.mjs';
import { localizeItems,localizeValues,localizeResult } from '../i18n.mjs';
import { renderWheel } from '../chart.mjs';

test('every item in both instruments has a Korean name and descriptor with stable IDs',()=>{
  for(const version of ['short','detailed']) {
    const original=SURVEYS[version].items;
    const korean=localizeItems(original,version,'ko');
    assert.equal(korean.length,original.length);
    for(let i=0;i<original.length;i++) {
      assert.equal(korean[i].id,original[i].id);
      assert.match(korean[i].name,/[가-힣]/);
      assert.match(korean[i].description,/[가-힣]/);
      assert.notEqual(korean[i],original[i]);
    }
    assert.deepEqual(localizeItems(original,version,'en'),original);
  }
});
test('translated results preserve numbers, markers, version, and share payload',()=>{
  for(const version of ['short','detailed']) {
    const answers=SURVEYS[version].items.map((_,i)=>i%9+SURVEYS[version].min);
    const original=score(answers,version), translated=localizeResult(original,'ko');
    for(const key of ['mean','highest','lowest','flat','version','min','max']) assert.deepEqual(translated[key],original[key]);
    assert.deepEqual(translated.values.map(v=>[v.id,v.raw,v.centered]),original.values.map(v=>[v.id,v.raw,v.centered]));
    assert.equal(encodeResult('별빛',answers,version),encodeResult('별빛',answers,translated.version));
    assert.deepEqual(localizeResult(translated,'en').values.map(v=>v.raw),original.values.map(v=>v.raw));
    assert.deepEqual(localizeResult(translated,'en').values.map(v=>v.name),original.values.map(v=>v.name));
  }
});
test('all ten value interpretations translate without modifying the English source',()=>{
  const korean=localizeValues('ko');
  assert.equal(korean.length,10);
  for(const item of korean) for(const key of ['name','description','meaning','reflection','group']) assert.match(item[key],/[가-힣]/);
  assert.equal(VALUES[0].name,'Power');
  assert.deepEqual(localizeValues('en'),VALUES);
});
test('chart labels and accessible description follow the chosen language with identical geometry',()=>{
  const result=score([0,1,2,3,4,5,6,7,8,4]);
  const english=renderWheel(result,'en'), korean=renderWheel(result,'ko');
  assert.match(korean,/보편주의/);
  assert.match(korean,/나의 가치관 원형 지도/);
  assert.ok(!korean.includes('Your values circle'));
  const paths=svg=>Array.from(svg.matchAll(/<g data-value="([^"]+)"><path d="([^"]+)"/g),m=>[m[1],m[2]]);
  assert.deepEqual(paths(english),paths(korean));
});
