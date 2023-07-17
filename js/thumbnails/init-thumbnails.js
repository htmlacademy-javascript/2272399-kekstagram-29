import { renderThumbnails } from './render-thumbnails.js';
import { getData } from '../utils/api.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';

const onGetSuccess = (data) => {
  renderThumbnails(data);
};

const onGetError = (error) => {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('get-error');
  errorMessage.textContent = error.message;
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, 3000);
};

const initThumbnails = () => {
  getData(DATA_URL, onGetSuccess, onGetError);
};

export { initThumbnails };
