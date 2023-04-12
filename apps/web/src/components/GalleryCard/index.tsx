import { FC, memo } from 'react';
import cn from 'classnames';
import { HeartDark, HeartRed } from 'public/icons';
import { useHover } from '@mantine/hooks';

import styles from './styles';

interface CardProps {
  href: string;
  liked: string[];
  author: string;
  id: string;
  authorID: string;
  switchLikeStatus(authorID: string, accountID: string, id: string): any;
  accountID: string;
}

const GalleryCard: FC<CardProps> = (props) => {
  const { href, liked, author, id, authorID, switchLikeStatus, accountID } = props;
  const { classes } = styles();
  const { hovered, ref } = useHover();

  return (
    <div ref={ref} className={classes.link}>
      <img className={classes.image} src={href} alt={href} />
      <span className={classes.heartWrapper}>
        <button onClick={() => switchLikeStatus(authorID, accountID, id)} type="button" className={classes.heart}>
          {liked.includes(accountID) ? <HeartRed /> : <HeartDark />}
        </button>
      </span>
      {hovered && (
        <div className={classes.description}>
          <span className={cn(classes.description__item, classes.author)}>{`author: ${author}`}</span>
          <span className={classes.description__item}>{`likeCount: ${liked.length}`}</span>
        </div>
      )}
    </div>
  );
};

export default memo(GalleryCard);
