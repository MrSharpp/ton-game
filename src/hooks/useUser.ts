import { UserContext } from "@/app/user-provider";
import { useLaunchParams, User } from "@telegram-apps/sdk-react";
import { useContext, useEffect, useState } from "react";

export function useUser(tgId?: number) {
  const user = useContext(UserContext);
  return user;
}
