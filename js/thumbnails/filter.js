import { renderThumbnails } from './render-thumbnails.js';
import { getRandomNumber, debounce } from '../utils/util.js';

const RANDOM_PICTURES_COUNT = 10;
const DELAY = 500;
const filters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const picturesContainer = document.querySelector('.pictures');

const sortByCommentsCount = (data) => (data.slice().sort((a, b) => b.comments.length - a.comments.length));

const sortInRandomOrder = (data) => {
  const dataClone = data.slice();
  for (let i = dataClone.length - 1; i > 0; i--) {
    const j = getRandomNumber(0, dataClone.length);
    [dataClone[i], dataClone[j]] = [dataClone[j], dataClone[i]];
  }

  return dataClone.splice(0, RANDOM_PICTURES_COUNT);
};

const getFilteringData = (filter, data) => {
  switch (filter) {
    case 'filter-random':
      return sortInRandomOrder(data);
    case 'filter-discussed':
      return sortByCommentsCount(data);
    default:
      return data;
  }
};

const setFilter = () => {
  let currentFilterButton = document.querySelector('.img-filters__button--active');
  return (newFilterButton) => {
    currentFilterButton.classList.remove('img-filters__button--active');
    currentFilterButton = newFilterButton;
    currentFilterButton.classList.add('img-filters__button--active');
  };
};

const renderFilteringPictures = (filter, data) => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());
  renderThumbnails(getFilteringData(filter, data));
};

const initFilter = (data) => {
  let filter = document.querySelector('.img-filters__button--active');
  filters.classList.remove('img-filters--inactive');
  const setNewFilter = setFilter();
  const renderPictures = debounce(() => renderFilteringPictures(filter, data), DELAY);

  filtersForm.addEventListener('click', (event) => {
    if (event.target.closest('.img-filters__button')) {
      filter = event.target.id;
      setNewFilter(event.target);
      renderPictures(filter, data);
    }
  });
};

export { initFilter };
