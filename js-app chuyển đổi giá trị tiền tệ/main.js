const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const swap = document.getElementById('swap');
const rateView = document.getElementById('rate');

function caculate(){
    const CurrencyOne = currencyOne.value;
    const CurrencyTwo = currencyTwo.value;
    fetch('https://open.exchangerate-api.com/v6/latest')
        .then(res => res.json())
        .then(data =>{
            const rate = data.rates[CurrencyTwo] / data.rates[CurrencyOne]
            rateView.innerText = `1 ${CurrencyOne} = ${rate} ${CurrencyTwo}`
            amountTwo.value = (amountOne.value * rate).toFixed(2); 
        })
}

currencyOne.addEventListener('change',caculate)
currencyTwo.addEventListener('change',caculate)
amountOne.addEventListener('input',caculate)
amountTwo.addEventListener('input',caculate)

swap.onclick =()=>{
    const temp = currencyOne.value
    currencyOne.value = currencyTwo.value
    currencyTwo.value = temp

    caculate()
}