import CurrencyRow from "./CurrencyRow";
import './App.css';
import { useEffect, useState } from "react";

// https://apilayer.com/marketplace/exchangerates_data-api#documentation-tab
const CURRENCY_RATE_URL = 'https://api.apilayer.com/exchangerates_data/latest';
const API_KEY = 'P6TDEvJk3fTnbl7mv5thKCzET38SxnHL';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState([]);
  const [toCurrency, setToCurrency] = useState([]);

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
      })
  }, [])
  return (
    <>
    <h1>Currency Converter</h1>
    <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={fromCurrency} onChangeCurrency={e => setFromCurrency(e.target.value)}></CurrencyRow>
    <div class="equals">=</div>
    <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={toCurrency} onChangeCurrency={e => setToCurrency(e.target.value)}></CurrencyRow>
    </>
  );
}

export default App;
