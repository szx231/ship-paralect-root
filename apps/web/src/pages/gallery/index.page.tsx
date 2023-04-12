import { NextPage } from 'next';

import { accountApi } from 'resources/account';
import { galleryApi } from 'resources/gallery';
import { switchLikeStatusApi } from 'resources/switchLikeStatus';

import TopBarProgress from 'react-topbar-progress-indicator';

import React, { useEffect, useState } from 'react';

import { Stich } from 'public/images';

import { TGalleryCard } from 'types';

import GalleryCard from 'components/GalleryCard';
import { useQuery } from 'react-query';
import PaintingUpload from './components/PaintingUpload';

import styles from './styles';

const Gallery: NextPage = () => {
  const { data: account } = accountApi.useGet();
  const { mutate: changeLikeStatus } = switchLikeStatusApi.useChangeLikeStatus();
  const { data: newPainting, isSuccess: isSuccessNewPainting } = useQuery('uploadPainting');

  const [copyPaintings, setCopyPaintings] = useState<TGalleryCard[]>([]);

  const { classes } = styles();
  const {
    data: paintings,
    hasNextPage,
    isSuccess,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    isLoading,
  } = galleryApi.useGetUserPainting();

  const switchLikeStatus = (authorID: string, accountID: string, id: string) => {
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

  const scrollHandler = () => {
    const { scrollHeight, scrollTop } = document.documentElement;
    if (scrollHeight - (scrollTop + window.innerHeight) < 100) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    if (copyPaintings.length < 1 && isSuccess) {
      const flatData = paintings?.pages.flatMap((n) => n.data).filter((el) => Boolean(el));
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
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  });

  useEffect(() => {
    if (isSuccessNewPainting && (newPainting as TGalleryCard).id) {
      setCopyPaintings((prevData: TGalleryCard[]) => [newPainting as TGalleryCard, ...prevData]);
    }
  }, [isSuccessNewPainting, newPainting]);

  return (
    <>
      {(isFetching || isLoading) && <TopBarProgress />}
      {isError && <div>something went wrong</div>}
      <PaintingUpload />
      <div className={classes.title}>Your paintings list</div>
      {isSuccess && copyPaintings.length !== 0 && (
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
      )}
      {isSuccess && copyPaintings.length < 1 && (
        <div className={classes.container}>
          <div className={classes.text}>Not found paintings</div>
          <Stich />
        </div>
      )}
    </>
  );
};

export default Gallery;
