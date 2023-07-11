import { isEscapeKey } from './util.js';

const COMMENTS_PER_LOAD = 5;
const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const img = document.querySelector('.big-picture__img').querySelector('img');
const imgCaption = document.querySelector('.social__caption');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.social__comment-count');
const commentsContainer = document.querySelector('.social__comments');
const commentsLoadButton = document.querySelector('.comments-loader');
const commentTemplate = document.querySelector('.social__comment');

let visibleCommentsCount = 0;
let comments;

const createComment = (item) => {
  const comment = commentTemplate.cloneNode(true);
  const commentImage = comment.querySelector('.social__picture');
  const commentText = comment.querySelector('.social__text');

  commentImage.src = item.avatar;
  commentImage.alt = item.name;
  commentText.textContent = item.message;

  return comment;
};
// Добавить изменение показа надписи комментариев

const setButtonState = () => {
  if (visibleCommentsCount >= comments.length) {
    commentsLoadButton.classList.add('hidden');
    return;
  }
  commentsLoadButton.classList.remove('hidden');
};

const updateCommentsCount = () => {
  commentsCount.innerHTML = `${visibleCommentsCount} из ${comments.length} комментариев`;
};

const renderComments = () => {
  const nextComments = comments.slice(visibleCommentsCount, visibleCommentsCount + COMMENTS_PER_LOAD);
  nextComments.forEach((comment) => (commentsContainer.append(createComment(comment))));
  visibleCommentsCount = Math.min(visibleCommentsCount + COMMENTS_PER_LOAD, comments.length);
  setButtonState();
  updateCommentsCount();
};

const closeBigPicture = () => {
  visibleCommentsCount = 0;
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeButtonClickHandler);
  document.removeEventListener('keydown', documentKeydownHandler);
  commentsLoadButton.removeEventListener('click', commentsLoadButtonHandler);
};

function commentsLoadButtonHandler(event) {
  event.preventDefault();
  renderComments();
}

function closeButtonClickHandler(event) {
  event.preventDefault();
  closeBigPicture();
}

function documentKeydownHandler(event) {
  if (isEscapeKey(event) && event.target.closest('.social__footer-text')) { // isNotMessageInput
    event.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
  closeButton.addEventListener('click', closeButtonClickHandler);
  commentsLoadButton.addEventListener('click', commentsLoadButtonHandler);
};

const renderContent = (data) => {
  img.src = data.url;
  img.alt = data.description;
  imgCaption.textContent = data.description;
  likesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;
  commentsContainer.innerHTML = '';
  renderComments();
};

const thumbnailClickHandler = (data) => {
  comments = data.comments;
  openBigPicture();
  renderContent(data);
};
// Переименовать, это не функция-обработчик
export { thumbnailClickHandler };

