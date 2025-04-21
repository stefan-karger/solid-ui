let uniqueId = 0;
const getUniqueId = () => uniqueId++;
const prefix = "S_";

export function useId() {
  let ref: number | undefined;
  if (ref === undefined) {
    ref = getUniqueId();
  }
  return `${prefix}${ref}`;
}
