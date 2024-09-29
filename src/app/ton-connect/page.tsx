'use client';

import { useUtils } from '@telegram-apps/sdk-react';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import {
  Avatar,
  Button,
  Cell,
  List,
  Navigation,
  Placeholder,
  Section,
  Text,
  Title,
} from '@telegram-apps/telegram-ui';

import { DisplayData } from '@/components/DisplayData/DisplayData';

import './styles.css';



export default function TONConnectPage() {
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

  if (!wallet) {
    return (
      <Placeholder
        className='ton-connect-page__placeholder'
        header='TON Connect'
        description={
          <>
            <Text>
              To display the data related to the TON Connect, it is required to connect your wallet
            </Text>
            <TonConnectButton className='ton-connect-page__button'/>
          </>
        }
      />
    );
  }

  const {
    account: { chain, publicKey, address },
    device: {
      appName,
      appVersion,
      maxProtocolVersion,
      platform,
      features,
    },
  } = wallet;

  return (
    <List>
      {'imageUrl' in wallet && (
        <>
          <Section>
            <Cell
              before={
                <Avatar src={wallet.imageUrl} alt='Provider logo' width={60} height={60}/>
              }
              after={<Navigation>About wallet</Navigation>}
              subtitle={wallet.appName}
              onClick={(e) => {
                e.preventDefault();
                utils.openLink(wallet.aboutUrl);
              }}
            >
              <Title level='3'>{wallet.name}</Title>
            </Cell>
          </Section>
          <TonConnectButton className='ton-connect-page__button-connected'/>
        </>
      )}
      <DisplayData
        header='Account'
        rows={[
          { title: 'Address', value: address },
          { title: 'Chain', value: chain },
          { title: 'Public Key', value: publicKey },
        ]}
      />
      <Button onClick={() => sendToOwnerAddress()}>Make A Transaction</Button>
      <DisplayData
        header='Device'
        rows={[
          { title: 'App Name', value: appName },
          { title: 'App Version', value: appVersion },
          { title: 'Max Protocol Version', value: maxProtocolVersion },
          { title: 'Platform', value: platform },
          {
            title: 'Features',
            value: features
              .map(f => typeof f === 'object' ? f.name : undefined)
              .filter(v => v)
              .join(', '),
          },
        ]}
      />
    </List>
  );
};
