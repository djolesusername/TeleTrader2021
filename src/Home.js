import React from "react";
import { CoinContext } from "./App";
import Coin from "./Coin";
import "./Home.css";

const Home = (props) => {
  const ticker = React.useContext(CoinContext);

  return (
    <table>
      <thead>
        <tr>
          <th> #</th>
          <th> Symbol</th>
          <th> Daily Change</th>
          <th> Volume</th>
          <th> Last Price</th>
        </tr>
      </thead>

      <tbody>
        {Object.values(ticker).map((coin, index) => (
          <Coin
            key={coin.channelID}
            index={index + 1}
            symbol={coin.pair}
            change={coin.dailyChange}
            volume={coin.volume}
            lastPrice={coin.last}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Home;
