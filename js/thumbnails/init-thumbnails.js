import { getData } from '../utils/api.js';
import { showMessage } from '../utils/messages.js';
import { initFilter, renderFilteringPictures } from './filter.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const ERROR_MESSAGE = 'Ошибка загрузки данных';
const ERROR_CLASS = 'error';

const getSuccess = (data) => {
  initFilter(data);
  renderFilteringPictures(document.querySelector('.img-filters__button--active').id, data);
};

const getError = () => showMessage(ERROR_CLASS, ERROR_MESSAGE);

const initThumbnails = () => getData(DATA_URL, getSuccess, getError);

export { initThumbnails };
