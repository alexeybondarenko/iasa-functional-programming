
// Sorting algorytm

function merge (a, b) {

  if (!a || a.length == 0) return b;
  if (!b || b.length == 0) return a;

  const headA = a[0];
  const tailA = a.slice(1);

  const headB = b[0];
  const tailB = b.slice(1);

  return (headA <= headB)
    ? [headA].concat(merge(tailA, b))
    : [headB].concat(merge(a, tailB));

}

function firstHalf (a) {
  return a.length > 1 ? a.slice(0, Math.floor(a.length / 2)) : [].concat(a);
}
function secondHalf (a) {
  return a.length > 1 ? a.slice(Math.floor(a.length / 2)) : [].concat(a);
}

function sort (a) {

  if (!Array.isArray(a)) throw new Error('sort function supports only Array');
  if (!a.length) return [];
  else if (a.length === 1) return [a[0]];
  else return merge(
    compose(sort, firstHalf)(a),
    compose(sort, secondHalf)(a)
  );

}

// Functional Utiilities

function compose (...args) {

  return (a) => args.reduceRight((acc, func) => {
    return func(acc);
  }, a);
}
function sequence (...args) {

  return (a) => args.reduce((acc, func) => {
    return func(acc);
  }, a);
}

// Monads

function sortMonad () {
  return (a) => ({
    state: sort(a.state)
  });
};

function printMonad () {
  return (a) => {
    console.log(a.state);
    return a;
  }
};
function writeMonad (dest) {
  return (a) => {
    dest = a.state;
    return a;
  }
};
function funcMonad (func) {
  return (a) => {
    func(a.state);
    return a;
  }
};

// Wrapped object.
class StateWrapper  {
  constructor (state) {
    this.state = state;
  }
}

const unsortedArray = new StateWrapper([1,2,3,4,0,5,6,7,8]);
let sortedArray = {};

sequence(
  sortMonad(),
  funcMonad(a => {sortedArray = a})
)(unsortedArray);

console.log(sortedArray);
