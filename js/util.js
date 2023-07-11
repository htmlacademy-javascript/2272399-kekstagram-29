const getRandomNumber = (min, max) => (Math.floor(Math.random() * (max - min) + min));

const isEscapeKey = (event) => event.key === 'Escape';

const isNotInput = (event) => !event.target.closest('input') && !event.target.closest('textarea');

export { getRandomNumber, isEscapeKey, isNotInput };
