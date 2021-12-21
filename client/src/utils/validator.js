export const isContentChange = (obj1, obj2) => {
  const objKey1 = Object.keys(obj1);
  const objKey2 = Object.keys(obj2);

  if (objKey1.length !== objKey2.length) return false;

  for (let key of objKey1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}