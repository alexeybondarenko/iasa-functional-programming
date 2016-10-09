
// helpers

function ordA(a) {
  return a.charCodeAt(0) - 65;
}

// Functional Utiilities

function curry (fn, ...curryArgs) {
  if (typeof fn !== 'function') throw new Error('first argument must be a function');
  return (...args) => {
    return fn(...[].concat(curryArgs).concat(args));
  }
}

function curryRight (fn, ...curryArgs) {
  if (typeof fn !== 'function') throw new Error('first argument must be a function');
  return (...args) => {
    return fn(...[].concat(args).concat(curryArgs));
  }
}

function times (n, iterator) {
  var accum = Array(Math.max(0, n));
  for (var i = 0; i < n; i++) accum[i] = iterator.call();
  return accum;
};

function repeat (source, n_times) {
  return times(n_times, () => source);
}

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

// Merge sort algorythm

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

function binnarySearch (arr, elem) {

  const procedure = (arr, startIdx, endIdx, elem) => {
    const length = endIdx - startIdx + 1;
    if (length === 1) return elem === arr[startIdx] ? startIdx : null;
    const middleIdx = startIdx + Math.floor((endIdx - startIdx) / 2);
    return procedure(arr, 0, middleIdx, elem) || procedure(arr, middleIdx + 1, endIdx, elem);
  }

  return procedure(arr, 0, arr.length - 1, elem);
}

function beaufortCipher(textSource, keySource, decode = 0) {
  const key = keySource.toUpperCase().replace(/[^A-Z]/g, '');
  const text = textSource.toUpperCase().replace(/[^A-Z]/g, '').split('');
  return text.map(function(a, i) {
    let b = key[i % key.length];
    let offset = ((ordA(b) - ordA(a) + Number(decode) * 26) + 26) % 26;
    return String.fromCharCode(offset + 65);
  }).join('');
}

// Monad class object.

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
  static do (...args) {
     return a => container(...args)(new Monad(a));
  }
}

/// Program

console.log('\nSorting\n');

Monad.do(
  print('Source::'),
  sort,
  print('Result::')
)([9,1,2,3,4,0,6,7,8]);

console.log('\nSearch\n');

Monad.do(
  print('Source::'),
  curryRight(binnarySearch, 'a'),
  print('Result:: index ->')
)('haskell');

console.log('\nCipher\n');

const CIPHER_KEY = 'secret';

const destCipher = Monad.do(
  print('source::'),
  curryRight(beaufortCipher, CIPHER_KEY),
  print('Result::'),
  curryRight(beaufortCipher, CIPHER_KEY, true), // decode
  print('Decode::')
)('ABONDARENKO');
