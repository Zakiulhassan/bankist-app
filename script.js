'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


// let arr = ['a', 'b', 'c', 'd', 'e'];

// // slice method - it doesn't mutate the original array
// console.log(arr.slice(2))
// console.log(arr.slice(2, 4))
// console.log(arr.slice(-2))
// console.log(arr.slice(1,-2))
// console.log(arr.slice()) // shallow copy of original array - slice (when we want to change multiple methods)
// console.log([...arr]); // shallow copy of original array - spread op


// // splice method - it mutates the original array
// console.log(arr.splice(-1));
// console.log(arr);
// console.log(arr.splice(1, 2));
// // first parameter is the location as in slice, second parrmeter is the number of elements to extract
// console.log(arr);

// // Reverse method - it mutates the original array
// arr = ['a', 'b', 'c', 'd', 'e'];
// let arr1 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr1.reverse());
// console.log(arr1);

// // concat method
// const letters = arr.concat(arr1);
// console.log(letters);
// console.log([...arr, ...arr1]);

// // Join method
// console.log(letters.join(' - '));

// // AT Method
// const arr2 = [23, 11, 64];
// console.log(arr2[0]);
// console.log(arr2.at(0));

// // getting the last element
// console.log(arr2[arr2.length-1]);
// console.log(arr2.slice(-1)[0]);
// // at method
// console.log(arr2.at(-1))




// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// // to get access to the current index (variable of tht array)
// for(const [i, movement] of movements.entries()){
//   if(movement>0) {
//     console.log(`Movement ${i +1}: You deposited ${movement}`)
//   } else {
//     console.log(`Movement ${i +1}: You withdrew ${Math.abs(movement)}`)
//   }
// }
// console.log("------ForEach------")

// // to get access to the current index (variable of tht array)

// // movements.forEach(function (movement) {
// // forEach not only passes the current element but also current index and entire array that we are looping
// movements.forEach(function (movement, index, array) {
//   if(movement>0) {
//     console.log(`Movement ${index+1}: You deposited ${movement}`)
//   } else {
//     console.log(`Movement ${index+1}: You withdrew ${Math.abs(movement)}`)
//   }
  
// })



// ForEach with Maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

console.log("------- ForEach with Maps -------")
currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`)
})

// ForEach with Maps
console.log("------- ForEach with Sets -------")
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR', 'USD']);
console.log(currenciesUnique);

currenciesUnique.forEach(function(value, _, map){
  console.log(`${value}: ${value}`)
})