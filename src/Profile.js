import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { UserContext } from "./App";

const cardStyle = { width: 300, margin: "0 auto" };

const Profile = () => {
  const { loggedIn } = React.useContext(UserContext);
  const [avatar, setAvatar] = useState();

  const executeChange = () => {
    // with this hack, new image will be fetched every time ;)
    const newAvatar = `https://api.hello-avatar.com/adorables/285/%3CYOUR_EMAIL${Math.random()}`;
    setAvatar(newAvatar);
    localStorage.setItem("avatarLink", JSON.stringify({ avatar: newAvatar }));
  };

  const loadAvatar = () => {
    const storedAvatar = JSON.parse(localStorage.getItem("avatarLink"));
    if (storedAvatar?.avatar) {
      setAvatar(storedAvatar.avatar);
    } else {
      executeChange();
    }
  };

  if (!avatar) {
    loadAvatar();
  }
  return (
    <React.Fragment>
      {loggedIn && (
        <Card title="Djordje Cvetkovic" bordered={false} style={cardStyle}>
          <img src={avatar} alt="" />
          <div>
            <a href="https://github.com/djolesusername">https://github.com/djolesusername</a>
          </div>
          <div> djordje@mom.rs</div>
          <Button onClick={executeChange}>Toggle Avatar</Button>
        </Card>
      )}
      {!loggedIn && <Card title="Please log in to access profile page" bordered={false} style={cardStyle}></Card>}
    </React.Fragment>
  );
};

export default Profile;
