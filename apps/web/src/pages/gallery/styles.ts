import { createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  wrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gridAutoRows: '240px',
    gridAutoFlow: 'dense',
    marginTop: '40px',
    gap: '10px',
    transition: 'all .3s ease-out',
  },
  title: {
    fontSize: '35px',
    color: '#000',
    margin: '0',
    marginTop: '30px',
  },
  container: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: '35px',
    color: '#FB6798',
    textShadow: '0px 0px 3px #69BBDE',
    textAlign: 'center',
  },
}));

export default useStyles;
