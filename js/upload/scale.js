const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DIVIDER = 100;

const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

let currentScale = MAX_SCALE;

const changeScale = (value) => {
  imagePreview.style.transform = `scale(${value / DIVIDER})`;
  scaleValue.value = `${value}%`;
};

const scaleBiggerClickHandler = (event) => {
  event.preventDefault();
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    changeScale(currentScale);
  }
};

const scaleSmallerClickHandler = (event) => {
  event.preventDefault();
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    changeScale(currentScale);
  }
};

const resetScale = () => {
  currentScale = MAX_SCALE;
  changeScale(currentScale);
};

const initScale = () => {
  scaleBigger.addEventListener('click', scaleBiggerClickHandler);
  scaleSmaller.addEventListener('click', scaleSmallerClickHandler);
};

export { initScale, resetScale };
