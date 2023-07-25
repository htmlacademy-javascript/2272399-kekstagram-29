import { renderBigPicture } from './thumbnail-modal.js';

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
  template.addEventListener('click', (event) => {
    event.preventDefault();
    renderBigPicture(item);
  });

  return template;
};

const renderThumbnails = (data) => data.forEach((item) => picturesContainer.append(createThumbnail(item)));

export { renderThumbnails };
