import { isEscapeKey, isNotInput } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = document.querySelector('.img-upload__input');
const filtersContainer = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreviewImages = document.querySelectorAll('.effects__preview');
const effects = document.querySelectorAll('.effects__radio');
const imageHashtags = document.querySelector('.text__hashtags');
const imageDescription = document.querySelector('.text__description');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const checkHashtags = (value) => {
  const hashtagRegexp = /#[a-zA-Z0-9]{1,19}/;
  const hashtags = value.split(' ');
  return hashtags.every((element) => (element.match(hashtagRegexp)));
};

const addValidators = () => {
  pristine.addValidator(imageDescription, (value) => (value.length < 140), 'Комментарий не может быть больше 140 символов');
  pristine.addValidator(imageHashtags, checkHashtags, 'Один или несколько хэштегов неверные');
};

const setDefaultSettings = () => {
  imageHashtags.value = '';
  imageDescription.value = '';
  imageUploadInput.value = '';
  effects[0].checked = true;
};

const closeImageModal = () => {
  setDefaultSettings();
  filtersContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
  closeButton.removeEventListener('click', closeButtonClickHandler);
  uploadForm.removeEventListener('submit', uploadFormSubmitHandler);
};

function closeButtonClickHandler(event) {
  event.preventDefault();
  closeImageModal();
}

function documentKeydownHandler(event) {
  if (isEscapeKey(event) && isNotInput(event)) {
    event.preventDefault();
    closeImageModal();
  }
}

function uploadFormSubmitHandler(event) {
  event.preventDefault();
  addValidators();
  pristine.validate();
}

const openImageModal = () => {
  filtersContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
  closeButton.addEventListener('click', closeButtonClickHandler);
  uploadForm.addEventListener('submit', uploadFormSubmitHandler);
};

const showImagePreview = (event) => {
  const fileUrl = URL.createObjectURL(event.target.files[0]);
  imagePreview.src = fileUrl;
  effectsPreviewImages.forEach((effect) => (effect.style.backgroundImage = `url(${fileUrl})`));
};

const imageUploadInputHandler = (event) => {
  openImageModal();
  showImagePreview(event);
};

const uploadImage = () => {
  imageUploadInput.addEventListener('change', imageUploadInputHandler);
};

export { uploadImage };
