import { isEscapeKey } from './util.js';

let message;
let isOpen = false;

const createMessage = (type, text, buttonText) => (
  `<section class="${type}">
    <div class="${type}__inner">
      <h2 class="${type}__title">${text}</h2>
      ${buttonText ? `<button type="button" class="${type}__button">${buttonText}</button>` : ''}
    </div>
  </section>`
);

const createElement = (template) => {
  const element = document.createElement('div');
  element.innerHTML = template;
  return element.firstChild;
};

const closeMessage = () => {
  message.remove();

  if (!isOpen) {
    document.body.classList.remove('modal-open');
  }
};

function documentKeydownHandler(event) {
  if (isEscapeKey(event)) {
    event.stopPropagation();
    event.preventDefault();
    closeMessage();
  }
}

const showMessage = (type, text, buttonText) => {
  message = createElement(createMessage(type, text, buttonText));
  document.body.append(message);
  isOpen = false;

  message.addEventListener('click', (event) => {
    if (!event.target.closest(`.${type}__inner`)) {
      event.preventDefault();
      closeMessage();
    }
  });
  document.addEventListener('keydown', documentKeydownHandler, {capture: true, once: true});

  if (buttonText) {
    const messageButton = message.querySelector(`.${type}__button`);
    messageButton.addEventListener('click', closeMessage);
  }

  if (!document.body.classList.contains('modal-open')) {
    document.body.classList.add('modal-open');
    return;
  }

  isOpen = true;
};

export { showMessage };
