const filters = document.querySelector('.img-filters');


const initFilter = () => {
  filters.classList.remove('img-filters--inactive');
};

const getFilteringData = (data) => {
  return data;
};

export { initFilter, getFilteringData };
