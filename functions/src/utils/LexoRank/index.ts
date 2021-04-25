export default class LexoRank {
  readonly value: string;

  constructor(lex: Lex) {
    this.value = LexoRank.getLexValue(lex);
  }

  private static isValidLex(value: string) {
    const regex = /^([0-9a-z]*[1-9a-z])$/;
    return regex.test(value);
  }

  private static getLexValue(lex: Lex) {
    const val = lex instanceof LexoRank ? lex.value : lex;

    if (!this.isValidLex(val)) {
      throw `Invalid lex value "${val}"`;
    }

    return val;
  }

  lessThan(lex: Lex) {
    const other = LexoRank.getLexValue(lex);
    const len = Math.max(this.value.length, other.length);

    for (let idx = 0; idx < len; idx++) {
      const charA = this.value[idx];
      const charB = other[idx];

      if (!charB) return false; // a is more specific
      if (!charA) return true; // b is more specific

      if (charA < charB) return true;
      if (charA > charB) return false;
    }

    return false;
  }

  increment() {
    let idx = this.value.length - 1;

    for (idx; idx >= 0; idx--) {
      const char = this.value[idx];
      if (char === 'z') continue;

      const newVal = this.value.substring(0, idx) + LexoRank.incrementChar(char);
      return new LexoRank(newVal);
    }

    const newVal = this.value + '1';
    return new LexoRank(newVal);
  }

  private append(str: string) {
    return new LexoRank(this.value + str);
  }

  private static incrementChar(char: String) {
    if (char === 'z') return '-1';
    if (char === '9') return 'a';

    return String.fromCharCode(char.charCodeAt(0) + 1);
  }

  public static between(lexA: Lex, lexB: Lex): LexoRank {
    const a = new LexoRank(lexA);
    const b = new LexoRank(lexB);

    if (!a.lessThan(b)) {
      throw `${a.value} is not less than ${b.value}`;
    }

    const incremented = a.increment();
    if (incremented.lessThan(b)) return incremented;

    const plus1 = a.append('1');
    if (plus1.lessThan(b)) return plus1;

    let pre = '0';
    let plus01 = a.append(`${pre}1`);

    while (!plus01.lessThan(b)) {
      pre += '0';
      plus01 = a.append(`${pre}1`);
    }

    return new LexoRank(plus01);
  }
}

type Lex = LexoRank | string;
