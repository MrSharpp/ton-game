"use client";

import { useUser } from "@/hooks/useUser";
import { Button, LargeTitle } from "@telegram-apps/telegram-ui";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";

export default function Home() {
  const wallet = useTonWallet();
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const { user, setUser, fetchUser } = useUser();

  async function completeTransaction() {
    return fetch(`/api/users/${user?.Id}/complete-transaction`, {
      method: "POST",
    });
  }

  async function sendToOwnerAddress() {
    await tonConnectUI.sendTransaction({
      messages: [
        {
          address: "UQAPPz1oAdKWvM55HNsIfiGvp_g9Wn2sxazTyZ4FC1LzWYMN", // destination address
          amount: "10000000", //Toncoin in nanotons
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60,
    });

    await completeTransaction();

    fetchUser();
  }

  function disconnectWallet() {
    tonConnectUI.disconnect();
  }

  return (
    <div
      style={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LargeTitle weight="1" style={{ marginBottom: "50px" }}>
        Airdrop
      </LargeTitle>

      <div
        style={{
          flexDirection: "column",
          display: "flex",
          gap: "20px",
          flexBasis: "auto",
          minWidth: 150,
        }}
      >
        {!wallet ? (
          <TonConnectButton className="ton-connect-page__button" />
        ) : (
          <div className="flex justify-center items-center gap-2">
            <Button onClick={() => disconnectWallet()} size="s">
              Disconnect Wallet
            </Button>
            ✅
          </div>
        )}
        {!!wallet && (
          <div className="flex justify-center items-center gap-2">
            <Button onClick={() => sendToOwnerAddress()} size="s">
              Make A Transaction (0.01 Ton)
            </Button>
            {user?.transactionDone ? " ✅" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
