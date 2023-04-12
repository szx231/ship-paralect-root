import { type File } from '@koa/multer';

import config from 'config';

import * as helpers from './cloud-storage.helper';

import { getStorage, ref, deleteObject, getDownloadURL, uploadBytesResumable, listAll } from 'firebase/storage';

import { User } from 'resources/user';
import { GalleryCard, TGallery, TRootDataGallery } from 'types';

import { initializeApp } from 'firebase/app';
import {  collection, doc, getDocs, getFirestore, setDoc, updateDoc,  arrayUnion, getDoc } from 'firebase/firestore';

initializeApp(config.firebase);
const storage = getStorage();
const db = getFirestore();

const removeAvatar = async (userID: string) => {
  const filePath = `avatars/${userID}/`;
  const storageRef = ref(storage, filePath);

  const listResult = await listAll(storageRef);

  listResult.items.forEach(async (itemRef) => {
    deleteObject(itemRef);
  });

};

const uploadAvatar = async (userID:string, file: File) => {
  await removeAvatar(userID);

  const filePath = `avatars/${userID}/${file.originalname} ${userID}`;
  const storageRef = ref(storage, filePath);

  const metadata = {
    contentType: file.mimetype,
  };

  const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};


const uploadGallery = async (user: User, file: File) => {
  const dateTime = Date.now();

  const filePath = `gallery/${user._id}/${file.originalname} ${dateTime}`;
  const storageRef = ref(storage, filePath);

  const metadata = {
    contentType: file.mimetype,
  };

  const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

  const downloadURL = await getDownloadURL(snapshot.ref);

  const id = `${dateTime}-${file.originalname}-${user._id}`;

  const data = {
    authorID: user._id,
    id,
    author: user.fullName,
    url: downloadURL,
    liked: [],
  };

  const galleryRef = doc(db, 'gallery', user._id);

  const docSnap = await getDoc(galleryRef);


  if (docSnap.exists()) {
    await updateDoc(galleryRef, {
      data: arrayUnion(data),
    });

    return data;
  }

  await setDoc(galleryRef, {
    data: [data],
  });

  return data;
};


const switchLikeStatus = async (painting: Record<string, string>, userID: string) => {
  const { authorID, id } = painting;
  const galleryRef = doc(db, 'gallery', authorID);
  const docSnap = await getDoc(galleryRef);

  if (docSnap.exists()) {
    const { data } = docSnap.data();
    const typedData: GalleryCard[] = data;

    const changedData = typedData.map(item => {
      if (item.id === id) {
        if (item.liked.includes(userID)) {
          return { ...item, liked: item.liked.filter(el => el !== userID) };
        } else {
          return { ...item, liked: [...item.liked, userID] };
        }
      } else {
        return item;
      }
    });

    await setDoc(galleryRef, {
      data: changedData,
    });
  }
};



const getUserGallery = async (userID:string, startIndex:number, endIndex: number, currentPage: number) => {
  const docRef = doc(db, 'gallery', userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { data } = docSnap.data();

    const response = {
      data: data.slice(startIndex, endIndex).reverse(),
      nextPageToken: currentPage + 1,
      hasNextPage: endIndex < data.length,
      itemCount: data.length,
    };

    return response;
  }

  return [];
};



const getAllPaintingGallery = async (startIndex:number, endIndex: number, currentPage: number) => {
  const querySnapshot = await getDocs(collection(db, 'gallery'));
  const gallerytsList = querySnapshot.docs.map((document) => document.data());

  const convertToSingleArray = (data: TRootDataGallery[]) => {
    return data.reduce<TGallery[]>((acc, cur) => acc.concat(cur.data), []);
  };

  const data = convertToSingleArray(gallerytsList as TRootDataGallery[]);

  const response = {
    data: data.slice(startIndex, endIndex).reverse(),
    nextPageToken: currentPage + 1,
    hasNextPage: endIndex < data.length,
    itemCount: data.length,
  };

  return response;

};

export default {
  getUserGallery,
  getAllPaintingGallery,
  helpers,
  uploadAvatar,
  uploadGallery,
  switchLikeStatus,
  removeAvatar,
};
