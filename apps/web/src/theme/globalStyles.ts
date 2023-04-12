import { CSSObject, MantineTheme } from '@mantine/core';

export const globalStyles = (theme: MantineTheme): CSSObject => ({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
    // backgroundColor: '#201F22',
  },

  body: {
    ...theme.fn.fontStyles(),
  },
});
