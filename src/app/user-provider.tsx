import { useLaunchParams } from "@telegram-apps/sdk-react";
import React, { useContext, useEffect, useState } from "react";
import { SplashScreen } from "./splash-screen";

type User = {
  Id: number;
  taskStreaks: number;
  taskStartTime: Date;
  friendStreaks: number;
  transactionDone: boolean;
};

export const UserContext = React.createContext<{
  user?: User;
  fetchUser: () => Promise<void>;
  setUser: (data: any) => void;
}>({ fetchUser: () => Promise.resolve(), setUser: () => null });
export const UserContextProvider = UserContext.Provider;

export function UserProvider({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [splashScreenVisible, setSplahScreenVisible] = useState(true);
  const tgUser = useLaunchParams()?.initData?.user;
  const [user, setUser] = useState<User>();

  const startParam = useLaunchParams().startParam;

  function fetchUser() {
    return fetch(`/api/users/upsert?referId=${startParam}`, {
      method: "POST",
      body: JSON.stringify(tgUser),
    }).then(async (res) => {
      setLoading(false);
      setUser(await res.json());
    });
  }

  useEffect(() => {
    if (tgUser?.id && !user?.Id) fetchUser();
    else {
      // handle if tg valid user not found
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSplahScreenVisible(false);
    }, 3_000);
  }, []);

  if (loading || splashScreenVisible)
    return <SplashScreen path={"/splash.mp4"} />;

  return (
    <UserContextProvider value={{ user: user, fetchUser, setUser }}>
      {children}
    </UserContextProvider>
  );
}
