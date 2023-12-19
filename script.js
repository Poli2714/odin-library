'use strict';

const mainSection = document.querySelector('.main-section');
const bookList = document.querySelector('.book-list');
const statusSpan = document.querySelectorAll('.status');

const checkReadingStatus = function (elementArr) {
  elementArr.forEach(element => {
    element.style.backgroundColor = `${
      element.textContent === 'Read' ? '#caffbf' : '#ffadad'
    }`;
  });

  return elementArr;
};

checkReadingStatus(statusSpan);

mainSection.addEventListener('click', function (e) {
  const target = e.target;
  if (!target.classList.contains('action')) return;

  if (target.classList.contains('delete')) {
    bookList.removeChild(target.closest('.book'));
  }
});

//Photo by <a href="https://unsplash.com/@chuttersnap?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">CHUTTERSNAP</a> on <a href="https://unsplash.com/photos/assorted-title-book-lot-Zf64Osndqvc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
