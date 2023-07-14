const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const COMMENT_LENGTH_INVALID = `Комментарий не может быть больше ${MAX_COMMENT_LENGTH} символов`;
const HASHTAG_INVALID = 'Введен невалидный хэштег';
const HASHTAG_COUNT_INVALID = 'Превышено количество хэштегов';
const HASHTAG_SIMILAR_INVALID = 'Хэштег повторяется';

const uploadForm = document.querySelector('.img-upload__form');
const imageHashtags = document.querySelector('.text__hashtags');
const imageDescription = document.querySelector('.text__description');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

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
  const hashtags = value.trim().toLowerCase().split(' ');
  return hashtags.length === new Set(hashtags).size;
};

const checkCommentLength = (value) => (value.length <= MAX_COMMENT_LENGTH);

const pristineValidate = () => {
  pristine.validate();
};

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
