import CurrencyRow from "./CurrencyRow";
import './App.css';
import { useEffect, useState } from "react";

// https://apilayer.com/marketplace/exchangerates_data-api#documentation-tab
const CURRENCY_RATE_URL = 'https://api.apilayer.com/exchangerates_data/latest';
const API_KEY = 'P6TDEvJk3fTnbl7mv5thKCzET38SxnHL';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState([]); // This is the value of first dropdown
  const [toCurrency, setToCurrency] = useState([]); // This is the value of second dropdown
  const [amount, setAmount] = useState(1) // This is going to store the amount updated by the user (first/second input)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true) // true if fromCurrency was updated, false if toCurrency was updated.
  const [exchangeRate, setExchangeRate] = useState();
  // console.log(data.rates)
  console.log(exchangeRate)

  let fromAmount, toAmount
  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  }
  else {
    fromAmount = amount / exchangeRate
    toAmount = amount
  }

  // updating fromCurrency and toCurrency whenever selectedCurrency is updated by the user
  useEffect(() => {
    // Don't fetch if fromCurrency or toCurrency are undefined.
    if(fromCurrency != null && toCurrency != null) {
      fetch(`${CURRENCY_RATE_URL}?symbols=${toCurrency}&base=${fromCurrency}`, requestOptions)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  let myHeaders = new Headers();
  myHeaders.append("apikey", API_KEY);

  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  // run this only the first time when our app loads. So, we give empty array as the second argument
  useEffect(() => {
    // res.json() returns another promise which actually has our data, so we use another .then().
    fetch(CURRENCY_RATE_URL, requestOptions)
      .then(res => res.json())
      .then(data => {
        setCurrencyOptions([...Object.keys(data.rates)]);
        setFromCurrency(data.base); // EUR
        const firstCurrencyFromOptions = Object.keys(data.rates)[0];
        setToCurrency(firstCurrencyFromOptions); // AED
        setExchangeRate(data.rates[firstCurrencyFromOptions])
      })
  }, [])
  return (
    <>
    <h1>Currency Converter</h1>
    <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={fromCurrency} onChangeCurrency={e => setFromCurrency(e.target.value)} amount={fromAmount} onChangeAmount={handleFromAmountChange}></CurrencyRow>
    <div class="equals">=</div>
    <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={toCurrency} onChangeCurrency={e => setToCurrency(e.target.value)} amount={toAmount} onChangeAmount={handleToAmountChange}></CurrencyRow>
    </>
  );
}

export default App;
