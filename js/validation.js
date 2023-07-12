const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form');
const imageHashtags = document.querySelector('.text__hashtags');
const imageDescription = document.querySelector('.text__description');
let pristine;

const checkHashtags = (value) => {
  if (!value.length) {
    return true;
  }
  const hashtags = value.trim().split(' ');
  const check = hashtags.every((element) => (element.match(HASHTAG_PATTERN)));
  return check;
};

const checkHashtagsCount = (value) => (value.split(' ').length <= 5);

const checkSimilarHashtags = (value) => {
  const hashtags = value.trim().split(' ');
  return hashtags.length === new Set(hashtags).size;
};

const checkCommentLength = (value) => (value.length <= MAX_COMMENT_LENGTH);

const addValidators = () => {
  pristine.addValidator(imageDescription, checkCommentLength, `Комментарий не может быть больше ${MAX_COMMENT_LENGTH} символов`);
  pristine.addValidator(imageHashtags, checkHashtags, 'Введен невалидный хэштег');
  pristine.addValidator(imageHashtags, checkHashtagsCount, 'Превышено количество хэштегов');
  pristine.addValidator(imageHashtags, checkSimilarHashtags, 'Хэштег повторяется');
};

const resetValidation = () => {
  pristine.destroy();
};

const initValidation = () => {
  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper'
  });

  addValidators();
};

export { initValidation, resetValidation };
