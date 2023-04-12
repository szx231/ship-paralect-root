import { FC } from 'react';
import { Footer as LayoutFooter } from '@mantine/core';

import { TelegramIcon } from 'public/icons';
import { Link } from 'components';

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <LayoutFooter
      height="50px"
      sx={(theme) => ({
        marginTop: 'auto',
        padding: '12px 0',
        textAlign: 'center',
        flex: '0 1 auto',
        backgroundColor: '#614496',
        border: 'none',
        fontSize: '16px',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <div
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        Хочу писать код в Paralect!!!
        <Link type="router" href="https://t.me/zxc2c22" inherit underline={false} inNewTab={false}>
          <TelegramIcon />
        </Link>
      </div>
    </LayoutFooter>
  );
};

export default Footer;
