const getRandomNumber = (min, max) => (Math.floor(Math.random() * (max - min) + min));

const isEscapeKey = (event) => event.key === 'Escape';

export { getRandomNumber, isEscapeKey };
