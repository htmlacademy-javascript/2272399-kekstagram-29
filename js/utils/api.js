const ERROR_GET_DATA = 'Ошибка загрузки данных. Попробуйте перезагрузить страницу';

const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(ERROR_GET_DATA);
    })
    .then((data) => onSuccess(data))
    .catch((error) => {
      onError(error);
    });
};

const sendData = (url, body, onSuccess, onError) => (
  fetch(url, {
    method: 'POST',
    body
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      throw new Error();
    })
    .catch(() => {
      onError();
    })
);

export { getData, sendData };
