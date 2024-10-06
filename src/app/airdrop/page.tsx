"use client";

import { Button, LargeTitle } from "@telegram-apps/telegram-ui";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";

export default function Home() {
  const wallet = useTonWallet();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  function sendToOwnerAddress() {
    tonConnectUI.sendTransaction({
      messages: [
        {
          address: "UQAPPz1oAdKWvM55HNsIfiGvp_g9Wn2sxazTyZ4FC1LzWYMN", // destination address
          amount: "10000000", //Toncoin in nanotons
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60,
    });
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
          <Button onClick={() => disconnectWallet()} size="s">
            Disconnect Wallet
          </Button>
        )}
        {!!wallet && (
          <Button onClick={() => sendToOwnerAddress()} size="s">
            Make A Small Transaction (0.01 Ton)
          </Button>
        )}
      </div>
    </div>
  );
}
