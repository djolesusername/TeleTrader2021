import React from "react";
import { Card } from "antd";
import "./Coin.css";

let formattedCurencyUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

let formattedCurencyEUR = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

const Coin = (props) => {
  //format value by adding -+ signs in front
  const formatChange = (change) => {
    let formattedChange = change;
    if (change > 0) {
      formattedChange = "+ " + change;
    }

    return formattedChange;
  };

  //format currency
  const formatVolume = (volume, symbol) => {
    let formattedVolume = volume;
    if (symbol.endsWith("USD")) {
      formattedVolume = formattedCurencyUSD.format(formattedVolume);
    }
    if (symbol.endsWith("EUR")) {
      formattedVolume = formattedCurencyEUR.format(formattedVolume);
    }

    return formattedVolume;
  };

  if (props.length === 0) {
    return (
      <div>
        <Card>
          <h2>Nothing found</h2>
        </Card>
      </div>
    );
  }

  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.symbol}</td>
      {props.change >= 0 ? (
        <td className="positive"> {formatChange(props.change)} </td>
      ) : (
        <td className="negative"> {formatChange(props.change)} </td>
      )}

      <td>{formatVolume(props.volume, props.symbol)}</td>
      <td>{formatVolume(props.lastPrice, props.symbol)}</td>
    </tr>
  );
};

export default Coin;
