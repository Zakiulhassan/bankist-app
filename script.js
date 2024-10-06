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



const displayMovements = function(movements, sort) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;


  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__value">${mov} €</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html)
  });
}
// displayMovements(account1.movements);


// display balance
const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`
}
// calcDisplayBalance(account1.movements)


// display summary/total
const calcDisplaySummary = (acc) => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomes} €`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  // lets say bank pays an interest of 2% in each deposit
  const interest = acc.movements
  .filter(mov => mov > 0)
  .map(deposit => (deposit*acc.interestRate)/100)
  .filter((int, i, arr) => {
    // console.log(arr)
    return int >= 1;
  })
  .reduce((acc, interest) => acc + interest, 0)
labelSumInterest.textContent = `${interest} €`;
}
// calcDisplaySummary(account1.movements)


// usernames
const createUsernames = accts => {
  accts.forEach(acc => {
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
      .map(name => name[0])
      .join('');
    })
  }
  createUsernames(accounts)


  // update UI based on data updates
  const updateUI = (currAcc) => {
    // display movements
    displayMovements(currAcc.movements);
    // display balance
    calcDisplayBalance(currAcc);
    // display summary
    calcDisplaySummary(currAcc)
  }


  // Login Functionality using FIND Method
  let currentAccount;
  // event handelers
  btnLogin.addEventListener('click', (e) => {
    // prevent form from submiting
    e.preventDefault();
    // Find the account
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    if(currentAccount?.pin === Number(inputLoginPin.value)) {
      // display UI and welcome message
      labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(" ")[0]}!`;
      containerApp.style.opacity = 100;
      // Clear input fields
      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();

      // update data
      updateUI(currentAccount);
    }
  })

  btnTransfer.addEventListener('click', (e)=> {
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
    console.log(amount, receiverAcc);

    inputTransferAmount.value = inputTransferTo.value = '';
    // check available balance > transfer amount
    if(amount > 0 && 
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
    ){
      // add deposit and withdrawal movements
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount)

      // update data
      updateUI(currentAccount);
    }
  })


  // Close an account - findIndex method
  btnClose.addEventListener('click', (e) => {
    e.preventDefault();

    if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){

      // find index
      const index = accounts.findIndex(acc => acc.username === currentAccount.username)
      // delete
      console.log(index);
      accounts.splice(index, 1);
      // hide UI
      containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = '';
  })
  


  // Request a loan from bank - using SOME method
  btnLoan.addEventListener('click', (e) => {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if(amount > 0 && currentAccount.movements.some(mov =>
      mov >= amount * 0.1)){
        // add movement
        currentAccount.movements.push(amount)

        // upateUI
        updateUI(currentAccount)

      }
      inputLoanAmount.value = "";
  })


// Sorting

let sorted = false;
btnSort.addEventListener('click', (e) => {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})














const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // Deposits and Withdrawals
// // optimised code
// const deposits = movements.filter(mov => mov > 0);
// const withdrawals = movements.filter(mov => mov < 0);

// // reduce method
// const balance = movements.reduce((acc, curr, i, arr) => {
//   // console.log(`Iteration ${i}: ${acc}`)
//   return acc + curr
// }, 0)
// console.log(balance)

// // unoptimised code
// const depositsFor = [];
// for(const mov of movements) if (mov > 0) depositsFor.push(mov)
//   console.log(depositsFor)


// // maximum value
// const max = movements.reduce((acc, mov)=> {
//   if(acc > mov)
//     return acc
//   else
//     return mov
// }, movements[0])
// console.log(movements)
// console.log(max)


// // Chaining all/multiple methods
// const eurToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   // .map(mov => mov * eurToUsd)
//   .map((mov, i, arr) => {
//     console.log(arr)
//     return mov * eurToUsd
//   })
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD)


// // sorting arrays
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// console.log(movements);
// console.log(movements.sort());


// // switch order and keep order
// movements.sort((a, b) => {
//   // return < 0, A, B
//   // return > 0, B, A
//   if (a > b) return 1;
//   if (b > a) return -1;
// })
// console.log(movements);


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);


// array map method

/////////////////////////////////////////////////


