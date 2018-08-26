import { getProtoTypeName } from '../src/utils';

describe('utils/getProtoTypeName', () => {

  function CustomClass() { }
  const protos = [
    Array,
    Object,
    RegExp,
    Date,
    Function,
    CustomClass
  ];

  protos.forEach(func => {
    test(func.name, () => {
      const target = Object.create(func.prototype);
      expect(getProtoTypeName(target)).toBe(func.name);
    });
  });


  test('字符串', () => {
    expect(getProtoTypeName('')).toBe('String');
  });

  test('数字', () => {
    expect(getProtoTypeName(NaN)).toBe('Number');
  });

  test('Null', () => {
    expect(getProtoTypeName(null)).toBe('Null');
  });

  test('Undefined', () => {
    expect(getProtoTypeName(undefined)).toBe('Undefined');
  });

  test('Boolean', () => {
    expect(getProtoTypeName(false)).toBe('Boolean');
  });
});
