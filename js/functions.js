/* Проверка на длину строки */

const checkLength = (text, len) => text.length <= len;

// console.log(checkLength('текст', 6));
// console.log(checkLength('текст', 3));

/* Проверка на палиндром */

function isPalindrom(text) {
  text = text.replaceAll(' ', '').toLowerCase();

  let i = 0, j = text.length - 1;
  while (i < j) {
    if (text[i] !== text[j]) {
      return false;
    }
    i++;
    j--;
  }

  return true;
}

// console.log(isPalindrom('до во Д'));
// console.log(isPalindrom('не палиндром'));
// console.log(isPalindrom('Лёша на полке клопа нашёл'));

/* Проверка цифр */

const findNumber = (text) => {
  const digits = String(text).match(/[0-9]/g);
  return digits ? +digits.join('') : NaN;
};

// console.log(findNumber('ECMAScript 2022'));
// console.log(findNumber('агент 007'));
// console.log(findNumber('а я томат'));
// console.log(findNumber(2004));
// console.log(findNumber(''));
