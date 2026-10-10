// Describe response structure without emitting scalar values or raw payloads.
export function responseShape(value) {
  const rows = [];
  function visit(item, path, depth) {
    if (rows.length >= 400 || depth > 10) return;
    const type = item === null ? 'null' : Array.isArray(item) ? 'array' : typeof item;
    const row = { path, type };
    if (type === 'string' || type === 'array') row.length = item.length;
    rows.push(row);
    if (type === 'array' && item.length) visit(item[0], `${path}[0]`, depth + 1);
    else if (type === 'object') {
      for (const key of Object.keys(item).sort()) visit(item[key], `${path}[${JSON.stringify(key)}]`, depth + 1);
    }
  }
  visit(value, '$', 0);
  return rows;
}
