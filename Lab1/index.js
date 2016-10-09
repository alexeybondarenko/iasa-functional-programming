

// Lab Task

// Abstract factory 1
// Комп’ютерна гра з різними військами, відповідно,класи «Гра», «Військо», «ФабрикаВійськ», та згідно до варіанту:
// 1  Китайське Румунське Авіація Танкове Підводні сили

class Game {}
  constructor () {
    this.playerA = ArmyFactory.createChineeseArmy();
    this.playerB = ArmyFactory.createRomanianArmy();
  }
}

class ArmyFactory {
  static createChineeseArmy () { return new ChineeseArmy(); }
  static createRomanianArmy () { return new RomanianArmy(); }
}

class Army {
  useAviationForces() {}
  useUnderwaterForces() {}
  useTankForces() {}
}

class ChineeseArmy extends Army {}
class RomanianArmy extends Army {}

// Composite 1
// 1  Автомобіль  Renault Lada  Volvo


// Strategy 2
// 2  DataSearch  Search  Interpolation Binary  Depth-first
