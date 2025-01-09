
export function hasShtmlAttribute(node) {
  //if (node.tagName.toLowerCase() === "section") {return true}
  const attributes = node.attributes;
  for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].name.startsWith('data-shtml-')) {
          return true;
      }
  }
  return false;
}
