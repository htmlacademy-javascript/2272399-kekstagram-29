import { isEscapeKey } from './util.js';
import { initScale, resetScale } from './scale.js';
import { initSlider, resetSlider } from './slider.js';
import { initValidation, resetValidation } from './validation.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const filtersContainer = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreviewImages = document.querySelectorAll('.effects__preview');

const closeUploadForm = () => {
  resetScale();
  resetSlider();
  resetValidation();
  uploadForm.reset();
  filtersContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
  closeButton.removeEventListener('click', closeButtonClickHandler);
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
}

const openUploadForm = () => {
  filtersContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
  closeButton.addEventListener('click', closeButtonClickHandler);
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
  initSlider();
  initValidation();
  uploadForm.addEventListener('submit', uploadFormSubmitHandler);
  uploadInput.addEventListener('change', uploadInputChangeHandler);
};

export { initUploadForm };
