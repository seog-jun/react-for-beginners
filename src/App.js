import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const [convertdAmount, setConvertedAmount] = useState(0);
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onChangeCoin = (event) => {
    const index = event.target.selectedIndex - 1;
    if (index === -1) {
      return;
    } else {
      const converted =
        Math.round((amount / Number(coins[index].quotes.USD.price)) * 100000) /
        100000;
      console.log(converted);
      setIndex(index);
      setHidden(false);
      setConvertedAmount(converted);
    }
  };
  const onChangeAmount = (event) => {
    setAmount(event.target.value);
  };
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <label htmlFor="amount">USD: </label>
          <input
            value={amount}
            id="amount"
            placeholder="Enter Amount to Convert"
            onChange={onChangeAmount}
          ></input>
          <select onChange={onChangeCoin}>
            <option>Select the coin</option>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name}({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <h4 hidden={hidden}>
            {amount} USD = {convertdAmount} {coins[index].symbol}
          </h4>
        </div>
      )}
    </div>
  );
}

export default App;
