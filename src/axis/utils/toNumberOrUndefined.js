export function toNumberOrUndefined(val) {
  if (typeof val === 'undefined') return val;
  return Number(val);
}