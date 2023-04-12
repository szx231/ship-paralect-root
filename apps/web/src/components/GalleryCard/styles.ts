import { createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  image: {
    borderRadius: '8px',
    boxShadow: 'inset 0 0 15px #000, 0 0 0 #000',
    transition: 'all .3s ease-out',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    display: 'block',
    border: '2px solid #614496',
    '&:hover': {
      boxShadow: 'inset 0 0 0 #000, 0 8px 15px #000',
      borderRadius: '8px',
      transform: 'scale(1.1)',
    },
  },
  link: {
    position: 'relative',
    display: 'block',
    gridRow: 'span 3',
    gridColumn: 'span 1',
    overflow: 'hidden',
    '&:nth-child(5n)': {
      gridRow: 'span 2',
    },
    '&:nth-child(7n)': {
      gridRow: 'span 3',
    },
    '&:nth-child(9n)': {
      gridRow: 'span 3',
    },
  },
  description: {
    display: 'grid',
    alignItems: 'center',
    position: 'absolute',
    left: '0%',
    bottom: 0,
    width: '100%',
    fontSize: '24px',
    color: '#fff',
    fontWeight: 'bold',
    backdropFilter: 'blur(12px)',
    boxShadow: 'inset 0 0 0 4000px #2f2b2b4d',
    height: '100px',
    padding: '0px 20px 0 20px',
    transition: 'all .3s ease-out',
  },
  description__item: {
    width: '100%',
  },
  heartWrapper: {
    display: 'flex',
    position: 'absolute',
    top: '3%',
    right: '5%',
    borderRadius: '50%',
    border: '1px solid #000',
    width: '62px',
    height: '62px',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: '#fff',
    border: 'none',
  },
  author: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}));

export default useStyles;
