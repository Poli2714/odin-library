'use strict';

const mainSection = document.querySelector('.main-section');
const bookList = document.querySelector('.book-list');
const statusEl = document.querySelectorAll('.status');
const form = document.querySelector('form');
const textInputs = document.querySelectorAll('.input');

const checkReadingStatus = function (elementArr) {
  elementArr.forEach(element => {
    element.style.backgroundColor = `${
      element.textContent === 'Read' ? '#caffbf' : '#ffadad'
    }`;
  });

  return elementArr;
};

checkReadingStatus(statusEl);

textInputs.forEach(input => {
  input.setAttribute('value', input.value);
});

form.addEventListener('keyup', function (e) {
  const target = e.target;
  if (!target.classList.contains('input')) return;

  target.attributes.value.value = target.value;
});

mainSection.addEventListener('click', function (e) {
  const target = e.target;
  if (!target.classList.contains('action')) return;

  if (target.classList.contains('delete')) {
    bookList.removeChild(target.closest('.book'));
  }
});

//Photo by <a href="https://unsplash.com/@chuttersnap?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">CHUTTERSNAP</a> on <a href="https://unsplash.com/photos/assorted-title-book-lot-Zf64Osndqvc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
