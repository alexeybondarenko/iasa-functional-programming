

// Lab Task

// Abstract factory 1
// Комп’ютерна гра з різними військами, відповідно,класи «Гра», «Військо», «ФабрикаВійськ», та згідно до варіанту:
// 1  Китайське Румунське Авіація Танкове Підводні сили

class Game {
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
class Car {

  startEngine() {}
  stopEngine() {}

  accelerate(p) {}
}

class Renault extends Car {
  startEngine () {
    console.log('renault is running');
  }
}
class Lada extends Car {
  accelerate(p) {
    console.log('lada is accelerating');
  }
}
class Volvo extends Car {
  stopEngine(p) {
    console.log('volvo is stopped');
  }
}

const compositeExample = () => {
  const logan = new Renault();
  const c90 = new Volvo();
  const kalina = new Lada();

  logan.startEngine();
  volvo.startEngine();
  lada.startEngine();

  logan.accelerate(1.3);

  logan.stopEngine();
  volvo.stopEngine();
  lada.stopEngine();
};

// Strategy 2
// 2  DataSearch  Search  Interpolation Binary  Depth-first

class Search {
  exec () {
    throw new Error('method must be redefined in extending class');
  }
}

class InterpolationSearch extends Search {
  exec (source, elem) {}
}
class BinnarySearch extends Search {
  exec (source, elem) {}
}
class DepthFirstSearch extends Search {
  exec (source, elem) {}
}

class DataSearch {
  constructor (strategy) {
    this.strategy = strategy;
  }
  search (source, elem) {
    return this.strategy.exec(source, elem);
  }
};

const strategyExample = () => {
  const dataSearchBinnary = new DataSearch(new BinnarySearch());
  const dataSearchInterpolation = new DataSearch(new InterpolationSearch());
  const dataSearchDepthFirstSearch = new DataSearch(new DepthFirstSearch());

  const SOURCE = [1,2,3,4,5];
  const SEARCH_ELEM = 2;

  dataSearchBinnary.search(SOURCE, SEARCH_ELEM);
  dataSearchInterpolation.search(SOURCE, SEARCH_ELEM);
  dataSearchDepthFirstSearch.search(SOURCE, SEARCH_ELEM);
}
