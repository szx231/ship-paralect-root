import { forwardRef, memo } from 'react';
import { Avatar, UnstyledButton, useMantineTheme } from '@mantine/core';

import { accountApi } from 'resources/account';
import styles from './styles';

const MenuToggle = forwardRef<HTMLButtonElement>((props, ref) => {
  const { primaryColor } = useMantineTheme();
  const { classes } = styles();

  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <UnstyledButton ref={ref} {...props}>
      <Avatar color={primaryColor} radius="xl">
        {account.avatarUrl ? (
          <img className={classes.image} src={account.avatarUrl} alt={account.avatarUrl} />
        ) : (
          <>
            {account.firstName.charAt(0)} {account.lastName.charAt(0)}
          </>
        )}
      </Avatar>
    </UnstyledButton>
  );
});

export default memo(MenuToggle);
