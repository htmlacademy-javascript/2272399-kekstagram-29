import { getPhotos } from './data.js';
import { thumbnailClickHandler } from './thumbnail-modal.js';

const data = getPhotos();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createThumbnail = (item) => {
  const template = pictureTemplate.cloneNode(true);
  const img = template.querySelector('.picture__img');
  const comments = template.querySelector('.picture__comments');
  const likes = template.querySelector('.picture__likes');

  img.src = item.url;
  img.alt = item.description;
  comments.textContent = item.comments.length;
  likes.textContent = item.likes;
  template.addEventListener('click', (evt) => {
    evt.preventDefault();
    thumbnailClickHandler(item);
  });

  return template;
};

const renderThumbnails = () => {
  data.forEach((item) => picturesContainer.append(createThumbnail(item)));
};

export { renderThumbnails };
