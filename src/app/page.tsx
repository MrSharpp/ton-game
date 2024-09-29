'use client';

import { Section, Cell, Image, List, Button } from '@telegram-apps/telegram-ui';

import { Link } from '@/components/Link/Link';

import tonSvg from './_assets/ton.svg';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useUtils } from '@telegram-apps/sdk-react';


export default function Home() {
  const wallet = useTonWallet();
  const utils = useUtils();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  function sendToOwnerAddress(){
    console.log("TDA");
    
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
    utils.shareURL("https://t.me/shahzar_2024_bot")
  }

  return (
    <div style={{backgroundColor: 'black', textAlign: 'center', paddingTop: '50%', height: '100%'}}>
      <h1 style={{marginBottom: '50px'}}>Amir Mini App</h1>
       <div style={{flexDirection: 'column', display: 'flex', gap: '50px', flexBasis: 'auto'}}>
       {!wallet && (<Button href='/ton-connect' Component={'a'} className='btn'>
              Connect Wallet
        </Button>)}
        {!!wallet && (<Button   onClick={() => sendToOwnerAddress} Component={"a"} className='btn'>
         
            Make A Small Transaction (0.001 Ton)
        </Button>)}
        <Button onClick={() => copyToClipBoard()} Component={"a"} className='btn'>
          
           Refferals
        </Button>
       </div>
   
    </div>
  );
}
