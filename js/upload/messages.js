import { isEscapeKey } from '../utils/util.js';

const messageStates = {
  success: 'success',
  error: 'error',
};
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
let currentMessage;
let currentButton;

const closeCurrentMessage = () => {
  currentMessage.removeEventListener('click', currentMessageClickHandler);
  currentButton.removeEventListener('click', currentButtonClickHandler);
  currentMessage.classList.add('hidden');
};

function currentMessageClickHandler(event) {
  if (!event.target.closest('.error__inner') || !event.target.closest('.success__inner')) {
    event.preventDefault();
    closeCurrentMessage();
  }
}

function currentButtonClickHandler(event) {
  event.preventDefault();
  closeCurrentMessage();
}

const setCurrentMessageState = (state) => {
  currentMessage = document.querySelector(`.${messageStates[state]}`);
  currentButton = document.querySelector(`.${messageStates[state]}__button`);
};

const showCurrentMessage = (value) => {
  setCurrentMessageState(value);

  currentMessage.classList.remove('hidden');
  currentButton.addEventListener('click', currentButtonClickHandler);
  currentMessage.addEventListener('click', currentMessageClickHandler);
  document.addEventListener('keydown', (event) => {
    if (isEscapeKey(event)) {
      event.stopPropagation();
      event.preventDefault();
      closeCurrentMessage();
    }
  }, {capture: true, once: true});
};

const initErrorMessage = () => {
  const error = errorTemplate.cloneNode(true);
  error.classList.add('hidden');
  document.body.append(error);
};

const initSuccessMessage = () => {
  const success = successTemplate.cloneNode(true);
  success.classList.add('hidden');
  document.body.append(success);
};

export { initErrorMessage, initSuccessMessage, showCurrentMessage };
