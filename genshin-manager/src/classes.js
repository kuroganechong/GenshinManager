module.exports = {
  Character: class Character {
    constructor(name, talent1, talent2, talent3) {
      this.name = name;
      this.talent1 = talent1;
      this.talent2 = talent2;
      this.talent3 = talent3;
    }
  },
  Talent: class Talent {
    constructor(mora, book, mat, boss) {
      this.mora = mora;
      this.book = book;
      this.mat = mat;
      this.boss = boss;
    }
  }
}