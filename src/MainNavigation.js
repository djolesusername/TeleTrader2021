import React from "react";
import { PageHeader, Button } from "antd";
import { NavLink } from "react-router-dom";
import { UserContext } from "./App";

const MainNavigation = () => {
  const { loggedIn, setLoggedIn } = React.useContext(UserContext);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("userLogged", JSON.stringify({ userLogged: true }));
  };

  return (
    <PageHeader
      title="TeleTrader"
      subTitle="Crypto prices"
      extra={
        loggedIn
          ? [
              <NavLink key="1" as={Button} to="/" exact>
                Home
              </NavLink>,
              <NavLink key="2" as={Button} to="/profile" exact>
                Profile
              </NavLink>,
            ]
          : [
              <NavLink key="1" as={Button} to="/" exact>
                Home
              </NavLink>,
              <Button key="2" onClick={handleLogin} type="primary">
                Login
              </Button>,
            ]
      }
    ></PageHeader>
  );
};
export default MainNavigation;
