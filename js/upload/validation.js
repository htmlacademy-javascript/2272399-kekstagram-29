const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const COMMENT_LENGTH_INVALID = `Комментарий не может быть больше ${MAX_COMMENT_LENGTH} символов`;
const HASHTAG_INVALID = 'Введен неправильный хэштег. Попробуйте формат #ХэшТег, не превышая 20 символов';
const HASHTAG_COUNT_INVALID = `Максимальное количество хэштегов: ${MAX_HASHTAG_COUNT}`;
const HASHTAG_SIMILAR_INVALID = 'Хэштег повторяется';

const uploadForm = document.querySelector('.img-upload__form');
const imageHashtags = document.querySelector('.text__hashtags');
const imageDescription = document.querySelector('.text__description');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const createHashtags = (value) => value.trim().toLowerCase().split(' ');

const checkHashtags = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = createHashtags(value);
  const check = hashtags.every((element) => (element.match(HASHTAG_REGEXP)));
  return check;
};

const checkHashtagsCount = (value) => (value.split(' ').length <= MAX_HASHTAG_COUNT);

const checkSimilarHashtags = (value) => {
  const hashtags = createHashtags(value);
  return hashtags.length === new Set(hashtags).size;
};

const checkCommentLength = (value) => (value.length <= MAX_COMMENT_LENGTH);

const pristineValidate = () => (pristine.validate());

const pristineReset = () => {
  pristine.reset();
};

const pristineInit = () => {
  pristine.addValidator(imageDescription, checkCommentLength, COMMENT_LENGTH_INVALID, 1, true);
  pristine.addValidator(imageHashtags, checkHashtags, HASHTAG_INVALID, 1, true);
  pristine.addValidator(imageHashtags, checkHashtagsCount, HASHTAG_COUNT_INVALID, 1, true);
  pristine.addValidator(imageHashtags, checkSimilarHashtags, HASHTAG_SIMILAR_INVALID, 1, true);
};

export { pristineInit, pristineReset, pristineValidate };
