
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

function container (...args) {

  return (a) => {
    if (typeof a.bind !== 'function' || typeof a.result !== 'function') throw Error('argument must have declared bind and result methods');

    return args.reduce((acc, func) => {
      if (typeof acc.bind !== 'function') throw new Error('possible invalid implementation of bind function. Undefined bind method.');
      return acc.bind(func);
    }, a).result();
  }

}

const print = (prefix = '') => a => {
  console.log(prefix, a);
  return a;
}

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

function sort (a) { // merge sort algorythm

  if (!Array.isArray(a)) throw new Error('sort function supports only Array');
  if (!a.length) return [];
  else if (a.length === 1) return [a[0]];
  else return merge(
    compose(sort, firstHalf)(a),
    compose(sort, secondHalf)(a)
  );

}

// Wrapped object.
class Monad  {
  constructor (state) {
    this.state = state;
  }
  bind (func) {
    return new Monad(func(this.state));
  }
  result () {
    return this.state;
  }
}

const source = [9,1,2,3,4,0,5,6,7,8];
const dest = container(
  sort,
  print('Print')
)(new Monad(source));

console.log('Result:', dest);
