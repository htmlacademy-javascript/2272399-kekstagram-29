const FILTERS = {
  'none': {
    name: 'none',
  },
  'chrome': {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'sepia': {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'marvin': {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  'phobos': {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  'heat': {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
};

const effectButtons = document.querySelector('.effects__list');
const effectValue = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');

const changeFilter = (name, value, unit) => {
  imagePreview.style.filter = `${name}(${value}${unit})`;
  effectValue.value = value;
};

const createSlider = (filter) => {
  sliderContainer.classList.remove('hidden');
  noUiSlider.create(slider, {
    range: {
      min: filter['min'],
      max: filter['max']
    },
    start: filter['max'],
    step: filter['step'],
    connect: 'lower',
  });

  slider.noUiSlider.on('update', () => {
    const sliderValue = slider.noUiSlider.get();
    changeFilter(filter.name, sliderValue, filter.unit);
  });
};

const resetSlider = () => {
  sliderContainer.classList.add('hidden');
  imagePreview.style.filter = null;
  effectValue.value = null;

  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
};

const effectButtonChangeHandler = (event) => {
  resetSlider();
  const filter = FILTERS[event.target.value];

  if (filter.name === 'none') {
    return;
  }

  createSlider(filter);
};

const initSlider = () => {
  resetSlider();
  effectButtons.addEventListener('change', effectButtonChangeHandler);
};

export { initSlider, resetSlider };
