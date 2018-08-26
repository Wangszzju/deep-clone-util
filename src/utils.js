export function getProtoTypeName(obj) {
  const str = Object.prototype.toString.call(obj);
  const initType = str.replace(/\[object\s+(.*?)\]/, '$1');
  // 防跳坑：自定义类使用Object.prototype.toString方法，会返回[object Object]，改get [Symbol.toStringTag]() 又不现实
  if (initType === 'Object') {
    return Object.getPrototypeOf(obj).constructor.name;
  } else {
    return initType;
  }
}
