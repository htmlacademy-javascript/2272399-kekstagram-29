import { getRandomNumber } from './util.js';

const COMMENT_USER_NAMES = ['Юзер1', 'Юзер2', 'Юзер3', 'Юзер4', 'Юзер5', 'Юзер6'];
const COMMENT_USER_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'];
const PHOTOS_COUNT = 25;

let id = 1;
let commentId = 1;

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: COMMENT_USER_MESSAGES[getRandomNumber(0, COMMENT_USER_MESSAGES.length)],
  name: COMMENT_USER_NAMES[getRandomNumber(0, COMMENT_USER_NAMES.length)],
});

const createComments = () => {
  const comments = [];
  const COMMENTS_COUNT = getRandomNumber(0, 30);

  for (let i = 0; i < COMMENTS_COUNT; i++) {
    comments.push(createComment());
  }

  return comments;
};

const createPhoto = () => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: `Описание фото ${id++}`,
  likes: getRandomNumber(15, 200),
  comments: createComments(),
});

const getPhotos = () => {
  const photos = [];

  for(let i = 0; i < PHOTOS_COUNT; i++){
    photos.push(createPhoto());
  }

  return photos;
};

export { getPhotos };
