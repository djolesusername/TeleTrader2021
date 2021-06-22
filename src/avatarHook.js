import { useState, useCallback } from "react";
//hooks name to start with use
export const useAvatar = () => {
  const [avatar, setAvatar] = useState();

  //storing data across rerander cycles. Don't want to rerender when data changes
  //sendRequest wrapped in usecallback so it doesn't get re-created whenever hook re-runs
  const sendRequest = useCallback(async () => {
    try {
      const newAvatar = `https://picsum.photos/285/285?${Math.random()}`;

      setAvatar(newAvatar);

      return avatar;
    } catch (err) {
      throw err;
    }
  }, []);

  return { avatar };
};
