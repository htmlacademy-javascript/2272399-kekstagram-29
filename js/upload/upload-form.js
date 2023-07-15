import { isEscapeKey } from '../utils/util.js';
import { initScale, resetScale } from './scale.js';
import { initSlider, updateSlider } from './slider.js';
import { pristineInit, pristineReset, pristineValidate} from './validation.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const filtersContainer = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreviewImages = document.querySelectorAll('.effects__preview');
const filterList = document.querySelector('.effects__list');
const defaultFilter = document.querySelector('input[checked].effects__radio').value;

const filterListChangeHandler = (event) => {
  updateSlider(event.target.value);
};

const closeUploadForm = () => {
  resetScale();
  pristineReset();
  updateSlider(defaultFilter);
  uploadForm.reset();
  filtersContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
  closeButton.removeEventListener('click', closeButtonClickHandler);
  filterList.removeEventListener('change', filterListChangeHandler);
};

function closeButtonClickHandler(event) {
  event.preventDefault();
  closeUploadForm();
}

function documentKeydownHandler(event) {
  if (isEscapeKey(event) && !event.target.closest('.text__hashtags') && !event.target.closest('.text__description')) {
    event.preventDefault();
    closeUploadForm();
  }
}

function uploadFormSubmitHandler(event) {
  event.preventDefault();

  if (pristineValidate()) {
    closeUploadForm();
  }
}

const openUploadForm = () => {
  filtersContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
  closeButton.addEventListener('click', closeButtonClickHandler);
  filterList.addEventListener('change', filterListChangeHandler);
};

const showImagePreview = (event) => {
  const fileUrl = URL.createObjectURL(event.target.files[0]);
  imagePreview.src = fileUrl;
  effectsPreviewImages.forEach((effect) => (effect.style.backgroundImage = `url(${fileUrl})`));
};

const uploadInputChangeHandler = (event) => {
  if (event.target.files[0].type.match(/image/)) {
    openUploadForm();
    showImagePreview(event);
  }
};

const initUploadForm = () => {
  initScale();
  pristineInit();
  initSlider(defaultFilter);
  uploadForm.addEventListener('submit', uploadFormSubmitHandler);
  uploadInput.addEventListener('change', uploadInputChangeHandler);
};

export { initUploadForm };
