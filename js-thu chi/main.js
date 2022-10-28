const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransaction = JSON.parse(localStorage.getItem('transaction'));
let transactions = localStorage.getItem('transaction') !== null ? localStorageTransaction : [];
console.log(transactions)
//Add Transaction
function addTransaction(e){
    e.preventDefault();

    if(text.value.trim() === '' && amount.value.trim() === ''){
        alert('Please add a text and a amount')
    }
    else{
        const transaction = {
            id : genetionID(),
            text: text.value,
            amount: +amount.value
        }
        //Save file
        transactions.push(transaction);

        //Add transaction DOM 
        addTransactionDOM(transaction)

        updateValue()

        updateLocalStorage()
        text.value = ''
        amount.value = ''
    }
}

//Genetion ID
function genetionID(){
    return Math.floor(Math.random() * 1000000)
}

//Add transaction DOM
function addTransactionDOM(transaction){
    const sign = transaction.amount < 0 ? '-' : '+'

    const item = document.createElement('li')

    item.classList.add(transaction.amount < 0 ? 'minus': 'plus')

    item.innerHTML = `${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick='removeTransaction(${transaction.id})'>x</button>`

    list.appendChild(item)
}

function updateValue(){
    const amounts = transactions.map(transaction => transaction.amount)

    const total = amounts.reduce((acc,item)=> (acc+= item),0).toFixed(2)

    const income = amounts
    .filter(item => item > 0)
    .reduce((acc,item) => (acc+= item), 0)
    .toFixed(2)

    const express = ((amounts
    .filter(item => item < 0)
    .reduce((acc,item) => (acc+= item), 0)) * -1)
    .toFixed(2)

    balance.innerHTML = `$${total}`
    moneyPlus.innerHTML = `$${income}`
    moneyMinus.innerHTML = `$${express}`
}

function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

function init(){
    list.innerHTML = ''

    transactions.forEach(addTransactionDOM)
    updateValue()
}

function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id)

    updateLocalStorage()

    init()
}
init()
form.addEventListener('submit', addTransaction)

