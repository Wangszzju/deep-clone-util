import { getProtoTypeName } from './utils';

const primitiveRe = /String|Number|Null|Undefined|Symbol|Boolean/;

const loopProp = (target, key) => target === target[key];

const deepClone = src => {
  const name = getProtoTypeName(src);
  if (primitiveRe.test(name)) {
    return src;
  }
  let result;
  switch (name) {
    case 'RegExp':
      let flags = '';
      if (src.global) {
        flags = flags + 'g';
      }
      if (src.ignoreCase) {
        flags = flags + 'i';
      }
      if (src.multiline) {
        flags = flags + 'm';
      }
      result = new RegExp(src.source, flags);
      if (src.lastIndex) {
        result.lastIndex = src.lastIndex;
      }
      break;
    case 'Date':
      result = new Date(src.getTime());
      break;
    case 'Object':
      // 有意忽略不可枚举属性
      result = {};
      Object.keys(src).forEach(key => {
        result[key] = loopProp(src, key) ? result : deepClone(src[key]);
      });
      break;
    case 'Array':
      // 保证类型一致
      result = [];
      for (let i = 0; i < src.length; i++) {
        result[i] = loopProp(src, i) ? result : deepClone(src[i]);
      }
      break;
    default:
      const proto = Object.getPrototypeOf(src);
      // 一个坑：自定义类型被构造时的参数已经无从查找了
      result = Object.create(proto);
      Object.keys(src).forEach(key => {
        result[key] = loopProp(src, key) ? result : deepClone(src[key]);
      });
      break;
  }
  return result;
};

export default deepClone;
