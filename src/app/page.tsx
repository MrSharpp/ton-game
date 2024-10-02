"use client";

import { useUtils } from "@telegram-apps/sdk-react";
import { Button, Headline, LargeTitle } from "@telegram-apps/telegram-ui";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import Link from "next/link";

export default function Home() {
  const wallet = useTonWallet();
  const utils = useUtils();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  function sendToOwnerAddress() {
    console.log("TDA");

    tonConnectUI.sendTransaction({
      messages: [
        {
          address:
            "0:af8bc2328f2f1d34dde26a1189da2b24005e34c9d4beecf4752047f2548cc00d", // destination address
          amount: "0.00001", //Toncoin in nanotons
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60,
    });
  }

  function copyToClipBoard() {
    utils.shareURL("https://t.me/shahzar_2024_bot");
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
        Amir Mini App
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
          <Button onClick={() => disconnectWallet()} className="btn">
            Disconnect Wallet
          </Button>
        )}
        {!!wallet && (
          <Button onClick={() => sendToOwnerAddress()} size="s">
            Make A Small Transaction (0.001 Ton)
          </Button>
        )}

        <Button onClick={() => copyToClipBoard()} size="s">
          Referrals
        </Button>
      </div>
    </div>
  );
}
