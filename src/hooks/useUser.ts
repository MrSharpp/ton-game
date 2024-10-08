import { UserContext } from "@/app/user-provider";
import { useQuery } from "@tanstack/react-query";
import { useLaunchParams, useQRScanner, User } from "@telegram-apps/sdk-react";
import { useContext, useEffect, useState } from "react";

export function useUser() {
  const userCtx = useContext(UserContext);

  useQuery({
    queryKey: ["user"],
    queryFn: userCtx.fetchUser,
  });

  return userCtx;
}
