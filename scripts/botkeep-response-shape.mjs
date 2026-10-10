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

// Only public scope identifiers from the official OpenAPI can be emitted.
const publicScopes = new Set(['backups:create','backups:delete','backups:read','backups:restore',
  'billing:read','console:write','deploy:write','domains:read','domains:write','environment:read',
  'environment:write','files:read','files:write','logs:read','packages:read','packages:write',
  'permissions:read','permissions:write','plan:read','power:write','projects:read','projects:write',
  'settings:read','settings:write','tickets:read','tickets:write','workloads:create','workloads:read','workloads:update']);

export function accessDiagnosis(value) {
  const detail = typeof value?.detail === 'string' ? value.detail : '';
  return {
    mentionsScope: /scope/i.test(detail),
    mentionsResource: /resource|workload|allowlist/i.test(detail),
    mentionsPermission: /permission|access|forbidden/i.test(detail),
    mentionsExpiredKey: /expir/i.test(detail),
    referencedScopes: [...new Set((detail.match(/[a-z]+:[a-z]+/g) ?? []).filter(scope => publicScopes.has(scope)))],
  };
}
