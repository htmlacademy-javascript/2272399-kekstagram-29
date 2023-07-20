import { renderThumbnails } from './render-thumbnails.js';
import { getData } from '../utils/api.js';
import { showMessage } from '../utils/messages.js';
import { initFilter } from './filter.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const ERROR_GET_DATA = 'Ошибка загрузки данных. Попробуйте перезагрузить страницу';

const onGetSuccess = (data) => {
  initFilter(data);
  renderThumbnails(data);
};

const onGetError = () => {
  showMessage('error', ERROR_GET_DATA, false);
};

const initThumbnails = () => {
  getData(DATA_URL, onGetSuccess, onGetError);
};

export { initThumbnails };
