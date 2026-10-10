import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';

const root = new URL('../', import.meta.url);
const read = file => fs.readFileSync(new URL(file, root), 'utf8');

// This fixture was extracted from the reviewed Vietnamese release. It protects
// selectors, input values, navigation, and accessibility wiring independently
// of translated text. Only the deliberate release cache version is normalized.
test('English UI preserves markup hooks, input values, routes and accessibility wiring', () => {
  const baseline = JSON.parse(read('tests/markup-baseline-sha256.json'));
  for (const [file, expected] of Object.entries(baseline)) {
    const attributes = [...read(file).matchAll(/\b(id|class|href|src|data-[\w-]+|value|type|name|for|role|aria-(?!label\b)[\w-]+|tabindex|min|max|maxlength|rows|rel|target|as|crossorigin)="([^"]*)"/g)]
      .map(([, name, value]) => [name, value.replace(/\?v=[\d.]+/g, '?v=VERSION')]);
    assert.equal(attributes.length, expected.attributeCount, file);
    const hash = crypto.createHash('sha256').update(JSON.stringify(attributes)).digest('hex');
    assert.equal(hash, expected.sha256, file);
  }
});

test('runtime prose is English while original relational names and cities are retained', () => {
  const files = ['index.html', 'app.js', 'quiz.js', 'labs/core.js',
    'labs/relational.js', 'labs/systems.js', 'labs/sql.js', 'labs/sql-worker.js'];
  const vietnamese = /[àảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵ]/i;
  for (const file of files) {
    let source = read(file);
    if (file === 'labs/relational.js') {
      assert.ok(source.includes("name:'Bình',city:'Huế'"));
      assert.equal((source.match(/city:'Hà Nội'/g) || []).length, 2);
      source = source.replaceAll('Bình', '').replaceAll('Huế', '').replaceAll('Hà Nội', '');
    }
    if (file === 'app.js') source = source.replace("replace(/đ/g,'d')", '');
    assert.doesNotMatch(source, vietnamese, file);
  }
});
