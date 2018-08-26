import deepClone from '../src/index';

describe('deepClone', () => {
  function Sub() {
    this.self = this;
    this.name = '123';
  }

  const tags = [
    { id: 1, name: '精致' },
    { id: 2, name: '体面' },
    { id: 3, name: '大方' }
  ];
  tags.push(tags);

  const srcObj = {
    sex: 1,
    grade: {
      math: 90,
      history: 95
    },
    tags,
    // Date类型
    birthDay: new Date(904383212843),
    // RegExp类型
    alias: new RegExp('大锤|王', 'gim'),
    sub: new Sub()
  };
  // 循环引用
  srcObj.loop = srcObj;

  test('循环引用', () => {
    const clonedObj = deepClone(srcObj);
    expect(clonedObj.loop).toBe(clonedObj);
    expect(srcObj.loop).toBe(srcObj);
    expect(srcObj.loop).not.toBe(clonedObj);
  });


  test('基本类型克隆', () => {
    const clonedObj = deepClone(srcObj);
    expect(clonedObj.sex).toBe(srcObj.sex);
  });

  test('对象检测', () => {
    const clonedObj = deepClone(srcObj);
    clonedObj.grade.math = 95;
    expect(clonedObj.grade.math).toBe(95);
    expect(srcObj.grade.math).toBe(90);
  });

  test('数组检测', () => {
    const clonedObj = deepClone(srcObj);
    // 数组内对象修改测试
    clonedObj.tags[0] = { id: 1, name: '优雅' };
    expect(clonedObj.tags[0]).toEqual({ id: 1, name: '优雅' });
    expect(srcObj.tags[0]).toEqual({ id: 1, name: '精致' });
    // 长度测试
    clonedObj.tags.pop();
    expect(clonedObj.tags.length).toBe(3);
    expect(srcObj.tags.length).toBe(4);
  });

  test('内置对象', () => {
    const clonedObj = deepClone(srcObj);
    // 日期对象测试
    expect(clonedObj.birthDay).not.toBe(srcObj.birthDay);
    expect(clonedObj.birthDay.getTime()).toBe(srcObj.birthDay.getTime());
    // 正则对象测试
    expect(clonedObj.alias).not.toBe((srcObj.alias));
    expect(clonedObj.alias.global).toBe((srcObj.alias.global));
    expect(clonedObj.alias.ignoreCase).toBe((srcObj.alias.ignoreCase));
    expect(clonedObj.alias.source).toBe((srcObj.alias.source));
  });
});
