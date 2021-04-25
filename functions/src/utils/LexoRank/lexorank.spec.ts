import LexoRank from '.';

describe('LexoRank - Constructor', () => {
  const makeLex = (val: string) => jest.fn(() => new LexoRank(val));

  test('throws for invalid input', () => {
    expect(makeLex('0')).toThrow();
    expect(makeLex('C')).toThrow();
    expect(makeLex('a90')).toThrow();
    expect(makeLex('12A')).toThrow();
  });

  test('creates for valid input', () => {
    expect(makeLex('01')).not.toThrow();
    expect(makeLex('c')).not.toThrow();
    expect(makeLex('a909')).not.toThrow();
    expect(makeLex('12a')).not.toThrow();
  });
});

describe('LexoRank - Rank comparison', () => {
  test('single chars', () => {
    expect(new LexoRank('1').lessThan('9')).toBe(true);
    expect(new LexoRank('8').lessThan('2')).toBe(false);
    expect(new LexoRank('8').lessThan('8')).toBe(false);
    expect(new LexoRank('a').lessThan('z')).toBe(true);
    expect(new LexoRank('w').lessThan('d')).toBe(false);
    expect(new LexoRank('w').lessThan('w')).toBe(false);
    expect(new LexoRank('9').lessThan('a')).toBe(true);
    expect(new LexoRank('c').lessThan('5')).toBe(false);
  });

  test('multiple chars', () => {
    expect(new LexoRank('1324').lessThan('1322')).toBe(false);
    expect(new LexoRank('1322').lessThan('1322')).toBe(false);
    expect(new LexoRank('1a22').lessThan('1b22')).toBe(true);
    expect(new LexoRank('1522').lessThan('1b11')).toBe(true);
  });
});

describe('LexoRank - Increment', () => {
  test('single char', () => {
    expect(new LexoRank('1').increment().value).toBe('2');
    expect(new LexoRank('8').increment().value).toBe('9');
    expect(new LexoRank('9').increment().value).toBe('a');
    expect(new LexoRank('a').increment().value).toBe('b');
    expect(new LexoRank('y').increment().value).toBe('z');
    expect(new LexoRank('z').increment().value).toBe('z1');
  });

  test('multiple chars', () => {
    expect(new LexoRank('11').increment().value).toBe('12');
    expect(new LexoRank('2b').increment().value).toBe('2c');
    expect(new LexoRank('109').increment().value).toBe('10a');
    expect(new LexoRank('abz').increment().value).toBe('ac');
    expect(new LexoRank('yzz').increment().value).toBe('z');
    expect(new LexoRank('y2wzz').increment().value).toBe('y2x');
    expect(new LexoRank('zzz').increment().value).toBe('zzz1');
  });
});

describe('LexoRank - Between', () => {
  test('throws for invalid input', () => {
    const lexBetween = (a: string, b: string) => jest.fn(() => LexoRank.between(a, b));

    expect(lexBetween('3', '1')).toThrow();
    expect(lexBetween('3a', '34')).toThrow();
    expect(lexBetween('z4', 'z4')).toThrow();
  });

  test('single char', () => {
    expect(LexoRank.between('1', '3').value).toBe('2');
    expect(LexoRank.between('1', '9').value).toBe('2');
    expect(LexoRank.between('9', 'c').value).toBe('a');
    expect(LexoRank.between('a', 'z').value).toBe('b');
    expect(LexoRank.between('1', '2').value).toBe('11');
    expect(LexoRank.between('a', 'b').value).toBe('a1');
  });

  test('multiple chars', () => {
    expect(LexoRank.between('12', '1a').value).toBe('13');
    expect(LexoRank.between('101', '123').value).toBe('102');
    expect(LexoRank.between('11', '12').value).toBe('111');
    expect(LexoRank.between('az', 'b').value).toBe('az1');
    expect(LexoRank.between('1a1', '1a11').value).toBe('1a101');
    expect(LexoRank.between('z4', 'z41').value).toBe('z401');
    expect(LexoRank.between('z4', 'z401').value).toBe('z4001');
  });
});
