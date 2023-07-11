const getRandomNumber = (min, max) => (Math.floor(Math.random() * (max - min) + min));

const isEscapeKey = (event) => event.key === 'Escape';

const isNotMessageInput = (event) => !event.target.closest('.social__footer-text');

export { getRandomNumber, isEscapeKey, isNotMessageInput };
