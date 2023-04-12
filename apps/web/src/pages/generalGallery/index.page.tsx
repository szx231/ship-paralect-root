import { NextPage } from 'next';

import { generalGalleryApi } from 'resources/generalGallery';
import { accountApi } from 'resources/account';
import { switchLikeStatusApi } from 'resources/switchLikeStatus';

import { useEffect, useState } from 'react';

import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { Link } from 'components';

import { TGalleryCard } from 'types';

import { RoutePath } from 'routes';

import TopBarProgress from 'react-topbar-progress-indicator';
import GalleryCard from 'components/GalleryCard';
import styles from './styles';

const GeneralGallery: NextPage = () => {
  const { data: account } = accountApi.useGet();
  const { mutate: changeLikeStatus } = switchLikeStatusApi.useChangeLikeStatus();

  const {
    data: paintings,
    isError,
    hasNextPage,
    isFetching,
    isSuccess,
    fetchNextPage,
    isFetchingNextPage,
  } = generalGalleryApi.useGetAllPainting();

  const { classes } = styles();
  const [copyPaintings, setCopyPaintings] = useState<TGalleryCard[]>([]);

  const switchLikeStatus = (authorID: string, accountID: string, id: string) => {
    if (!accountID) {
      return notifications.show({
        title: 'Вы не авторизованы!',
        message: 'Чтобы оценивать картины, пожалуйста авторизуйтесь!',
        autoClose: true,
      });
    }

    changeLikeStatus({ authorID, id, accountID });

    setCopyPaintings((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          const liked = el.liked.includes(accountID)
            ? [...el.liked.filter((item) => item !== accountID)]
            : [...el.liked, accountID];

          return { ...el, liked };
        }

        return el;
      })
    );
  };

  const filterMostLiked = () => setCopyPaintings((prev) => [...prev.sort((a, b) => b.liked.length - a.liked.length)]);

  const scrollHandler = () => {
    const { scrollHeight, scrollTop } = document.documentElement;
    if (scrollHeight - (scrollTop + window.innerHeight) < 100) {
      if (hasNextPage && !isFetchingNextPage && !isFetching) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    if (copyPaintings.length < 1 && isSuccess) {
      const flatData = paintings?.pages.flatMap((n) => n.data);
      return setCopyPaintings((prev) => [...prev, ...flatData]);
    }

    if (copyPaintings.length > 0 && isSuccess) {
      const lastData = paintings.pages[paintings.pages.length - 1].data;

      return setCopyPaintings((prev) => [...prev, ...lastData]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, paintings]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  });

  return (
    <>
      {isFetching && <TopBarProgress />}
      {isError && <div>something went wrong</div>}
      <div className={classes.title}>Gallery</div>
      {isSuccess && copyPaintings.length < 1 && <div className={classes.notPictures}>no pictures yet</div>}
      {isSuccess && copyPaintings.length > 0 && (
        <>
          <div className={classes.buttonWrapper}>
            <Button onClick={filterMostLiked} color="grape">
              Most liked
            </Button>
            {!account && (
              <Link underline={false} type="router" href={RoutePath.SignIn}>
                <Button color="grape">Sign In</Button>
              </Link>
            )}
          </div>
          <div className={classes.wrapper}>
            {copyPaintings.map((item) => (
              <GalleryCard
                switchLikeStatus={switchLikeStatus}
                key={item.id}
                href={item.url}
                liked={item.liked}
                author={item.author}
                id={item.id}
                authorID={item.authorID}
                accountID={account?._id ? account?._id : ''}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default GeneralGallery;
