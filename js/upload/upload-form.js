import { isEscapeKey } from '../utils/util.js';
import { initScale, resetScale } from './scale.js';
import { initSlider, updateSlider } from './slider.js';
import { pristineInit, pristineReset, pristineValidate} from './validation.js';
import { sendData } from '../utils/api.js';
import { showMessage } from '../utils/messages.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram';
const SUCCESS_CLASS = 'success';
const ERROR_CLASS = 'error';
const SUCCESS_MESSAGE = 'Изображение успешно загружено';
const SUCCESS_BUTTON_TEXT = 'Круто!';
const ERROR_UPLOAD_MESSAGE = 'Ошибка загрузки файла';
const ERROR_UPLOAD_BUTTON_TEXT = 'Попробовать еще раз';
const ERROR_FILE_MESSAGE = 'Расширение выбранного файла недопустимо';
const EXTENSION_REGEXP = /.(jpg|png|jpeg|gif|webp)$/;

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const filtersContainer = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreviewImages = document.querySelectorAll('.effects__preview');
const filterList = document.querySelector('.effects__list');
const defaultFilter = document.querySelector('input[checked].effects__radio').value;
const submitButton = document.querySelector('.img-upload__submit');


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

const successUpload = () => {
  closeUploadForm();
  showMessage(SUCCESS_CLASS, SUCCESS_MESSAGE, SUCCESS_BUTTON_TEXT);
};

const errorUpload = () => {
  showMessage(ERROR_CLASS, ERROR_UPLOAD_MESSAGE, ERROR_UPLOAD_BUTTON_TEXT);
};

async function uploadFormSubmitHandler(event) {
  event.preventDefault();

  if (pristineValidate()) {
    submitButton.disabled = true;
    await sendData(DATA_URL, new FormData(event.target), successUpload, errorUpload);
    submitButton.disabled = false;
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
  if (event.target.value.match(EXTENSION_REGEXP)) {
    openUploadForm();
    showImagePreview(event);
    return;
  }
  showMessage(ERROR_CLASS, ERROR_FILE_MESSAGE);
};

const initUploadForm = () => {
  initScale();
  pristineInit();
  initSlider(defaultFilter);
  uploadForm.addEventListener('submit', uploadFormSubmitHandler);
  uploadInput.addEventListener('change', uploadInputChangeHandler);
};

export { initUploadForm };
