"use client";

import { useUser } from "@/hooks/useUser";
import { Button, Subheadline } from "@telegram-apps/telegram-ui";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import Link from "next/link";

export default function Home() {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI({});
  const { user, fetchUser, setUser } = useUser();

  async function completeTransaction() {
    return fetch(`/api/users/${user?.Id}/complete-transaction`, {
      method: "POST",
    });
  }

  console.log(user);

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

    setUser({ transactionDone: true });
  }

  function disconnectWallet() {
    tonConnectUI.disconnect();
  }

  return (
    <div
      style={{
        textAlign: "center",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="relative"
    >
      <div className="mb-5">
        <h1 className="text-3xl font-bold">Airdrop</h1>

        <Subheadline>Task for eligible in airdrop:</Subheadline>
      </div>

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
            <Button
              onClick={() => sendToOwnerAddress()}
              size="s"
              disabled={user?.transactionDone}
            >
              Make A Transaction (0.01 Ton)
            </Button>
            {user?.transactionDone ? " ✅" : ""}
          </div>
        )}
      </div>

      <div className="mt-5 pr-5">
        <ul className="list-disc pl-10">
          <li className="text-base font-light text-left">
            An airdrop is the distribution of tokens to players’ wallets. These
            tokens will be traded on top exchanges, and you can either sell or
            hold them.
          </li>
          <li className="text-base font-light text-left">
            To receive your tokens, you must complete the two tasks above.
          </li>
          <li className="text-base font-light text-left">
            Airdrop date will be announced soon in our telegram channel.
          </li>
        </ul>
      </div>

      <div className="pt-8 flex justify-center absolute bottom-4 right-4">
        <Button Component={Link} size="s" href="/airdrop/roadmap">
          View Roadmap
        </Button>
      </div>
    </div>
  );
}
