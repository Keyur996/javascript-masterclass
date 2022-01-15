import '../assets/css/style.css';

const items = Object.freeze([
  { id: '🍔', name: 'Super Burger', price: 399 },
  { id: '🍟', name: 'Jumbo Fries', price: 199 },
  { id: '🥤', name: 'Big Slurp', price: 299 },
]);

console.log(items);

// Mutable And ImMutable way 

// Array - add && Remove. 
let itemToAdd = { id: '😄', name: 'Super Smile', price: 1000 };
let itemsCloned = [...items, itemToAdd]; // Add Item
let itemRemoved = items.filter((item) => item.id !== '🥤');
console.log(items, itemsCloned, itemRemoved);

// Object - Add And Remove
let itemObj = { id: '🐱', name: 'Super cat' };
let itemPriceAdded = { ...itemObj, price: 200 };
let { price, ...withoutPriceObj } = itemPriceAdded;
console.log(itemObj, itemPriceAdded, withoutPriceObj, price);

// Reference 

// Higher order Function
// 1. accept Function as Argument.
// 2. return fn 

// curry function

const compose = (...fns) => (x) => fns.reduceRight((v, fn) => fn(v), x)

const curry = (fn) => (...args) => {
  if(args.length >= fn.length) {
    return fn.apply(null, args);
  }
  return fn.bind(null, ...args);
}

const getNameUsingId = curry((id, items) => items.find(item => item.id === id).name);
const getFries = getNameUsingId('🍟', items);
const getBurger = getNameUsingId('🍔')(items);
console.log(getFries);
console.log(getBurger);

// Functional Composition
const split = curry((saperator, string) => string.split(saperator));
const join = curry((saperator, string) => string.join(saperator));
const map = curry((fn, array) => array.map(fn));
const toLowercase = (x) => x.toLowerCase();

const slugify = compose(
  join('-'),
  map(toLowercase),
  split(' ')
);

console.log(slugify('Ultimate Todd Motte'));








