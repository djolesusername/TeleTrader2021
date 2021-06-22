import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Home from "./Home";
import Profile from "./Profile";
import MainNavigation from "./MainNavigation";
import CryptoTicker from "./ws";

export const UserContext = createContext();
export const CoinContext = createContext();

const pairs = process.env.REACT_APP_PAIRS.split(",");
const ws_endpoint = process.env.REACT_APP_WS_ENDPOINT;

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ticker, setTicker] = useState({});

  useEffect(() => {
    new CryptoTicker(ws_endpoint, pairs, setTicker);
  }, [setTicker]);

  //Remember that we are logged in :)
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userLogged"));
    if (storedData?.userLogged) {
      setLoggedIn(true);
    }
  }, [loggedIn]);
  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      <CoinContext.Provider value={ticker}>
        <Router>
          <MainNavigation />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </CoinContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
