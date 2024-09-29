'use client';

import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';

import { Link } from '@/components/Link/Link';

import tonSvg from './_assets/ton.svg';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useUtils } from '@telegram-apps/sdk-react';

export default function Home() {
  const wallet = useTonWallet();
  const utils = useUtils();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  function sendToOwnerAddress(){
    tonConnectUI.sendTransaction({
      messages: [
        {
          address: "0:af8bc2328f2f1d34dde26a1189da2b24005e34c9d4beecf4752047f2548cc00d", // destination address
          amount: "0.001" //Toncoin in nanotons
        }
      ],
      validUntil: 1200000000000
    })
  }

  function copyToClipBoard(){
    navigator.clipboard.writeText("https://t.me/shahzar_2024_bot")
  }

  return (
    <List>
      <Section
        header='Shahzar Bot'
      >
        <Link href='/ton-connect'>
          <Cell
          >
            Connect Your Wallet
          </Cell>
        </Link>
        {!!wallet && (<Link  href={""} onClick={() => sendToOwnerAddress}>
          <Cell
          >
            Make A Small Transaction (0.001 Ton)
          </Cell>
        </Link>)}
        <Link href='' onClick={() => copyToClipBoard()}>
          <Cell
          >
           Refferals
          </Cell>
        </Link>
      </Section>
   
    </List>
  );
}
