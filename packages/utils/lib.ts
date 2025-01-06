export const MMT_CUSTOM_ID_PREFIX = "__mmt-custom-";

export function getMMTCustomId(tag: string) {
  return MMT_CUSTOM_ID_PREFIX + tag;
}
