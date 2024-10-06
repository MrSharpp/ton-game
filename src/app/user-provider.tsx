import { useLaunchParams } from "@telegram-apps/sdk-react";
import React, { useContext, useEffect, useState } from "react";

type User = {
  Id: number;
  taskStreaks: number;
  taskStartTime: Date;
  friendStreaks: number;
};

export const UserContext = React.createContext<User | null>(null);
export const UserContextProvider = UserContext.Provider;

export function UserProvider({ children }: any) {
  const [loading, setLoading] = useState(true);
  const tgUser = useLaunchParams()?.initData?.user;
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    if (tgUser?.id && !user?.Id)
      fetch(`/api/users/upsert`, {
        method: "POST",
        body: JSON.stringify(tgUser),
      }).then(async (res) => {
        setLoading(false);
        setUser(await res.json());
      });
    else {
      // handle if tg valid user not found
    }
  }, []);

  if (loading) return "Loading...";

  return <UserContextProvider value={user}>{children}</UserContextProvider>;
}
