import React from 'react'

export default function CurrencyRow(props) {
  const {currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount} = props
  return (
    <>
    <input type="number" className='input' value={amount} onChange={onChangeAmount}></input>
    {/* Everytime the dropdown option is changed by the user, onChangeCurrency function is going to be called with an event.
        This function modifies selectedCurrency which updates the <select> tag's value.
    */}
    <select value={selectedCurrency} onChange={onChangeCurrency}>
      {/* iterating over the array (currencyOptions) */}
      {
        currencyOptions.map(
        option => (
        <option key={option} value={option}>{option}</option>
        ))
      }
    </select>
    </>
  )
}
