const getRandomNumber = (min, max) => (Math.floor(Math.random() * (max - min) + min));

const isEscapeKey = (event) => event.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomNumber, isEscapeKey, debounce };
