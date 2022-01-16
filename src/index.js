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

const compose = (...fns) => (x) => fns.reduceRight((v, fn) => fn(v), x);
const pipe = (...fns) => (x) => fns.reduce((v, fn) => fn(v), x);

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

const slugify = compose(join('-'),map(toLowercase),split(' '));
const pipeSlugify = pipe(split(' '), map(toLowercase), join('-'));

console.log(slugify('Ultimate Todd Motte'));
console.log(pipeSlugify('Ultimate Todd Motte'));

// Class And getter And Setter

class Cart {
  #item;

  constructor(items = []) {
    this.value = items;
  }

  set value(items) {
    this.#item = Object.freeze(items);
  }

  get value() {
    return Object.freeze(this.#item);
  }

  get count() {
    return this.value.length;
  }

  add(item) {
    this.value = [...this.value, item];
  }

  remove(id) {
    this.value = this.value.filter(_item => _item.id !== id);
  }
}

class Product {
  _id;
  _name;
  _price;

  constructor(_id, _name, _price) {
    this._id = _id;
    this._name = _name;
    this._price = _price;
  }

  displayName() {
    return `${this._id} ${this._name}`;
  }
}

class Food extends Product {
  extras;
  constructor(_id, _name, _price, extras = []) {
    super(_id, _name, _price);
    this.extras = extras;
  }
}

class Drink extends Product {
  size;

  constructor(_id, _name, _price, size) {
    super(_id, _name, _price);
    this.size = size;
  }
}

const hotDog = new Food('🌭', 'Super HotDog', 449, ['periperi']);
const smallDrink = new Drink('🍹', 'Coco', 299, 'small');

const cart = new Cart();
cart.add(hotDog);
cart.add(smallDrink);
console.log(cart);