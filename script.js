'use strict';

const mainSection = document.querySelector('.main-section');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const textInputs = document.querySelectorAll('.input');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const genre = document.querySelector('#genre');
const pages = document.querySelector('#pages');
const statusCheckbox = document.querySelector('#status');
const bookList = document.querySelector('.book-list');
const statusParagraphs = document.querySelectorAll('.status');

const myLibrary = [];

function Book(title, author, genre, pages, isRead) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.isRead = isRead;
}

const addBookToLibrary = function (library, bookObj) {
  library.push(bookObj);
  return library;
};

const renderBooks = function (bookList, library) {
  library.forEach((book, i) =>
    bookList.insertAdjacentHTML(
      'beforeend',
      `<div class="book" data-bookIndex=${i}>
     <p>${book.title}</p>
     <p>${book.author}</p>
     <p>${book.genre}</p>
     <p>${book.pages}</p>
     <p class="status">${book.isRead ? 'Read' : 'Not read'}</p>
     <p>
       <button>
         <img
           class="edit action"
           src="./assets/edit.svg"
           alt="edit icon"
           width="25"
         />
      </button>
      <button>
        <img
          class="delete action"
          src="./assets/delete.svg"
          alt="delete icon"
          width="25"
        />
      </button>
    </p>
  </div>`
    )
  );
};

const setBgColorBasedOnReadingStatus = function (elementArr) {
  elementArr.forEach(element => {
    element.style.backgroundColor = `${
      element.textContent === 'Read' ? '#caffbf' : '#ffadad'
    }`;
  });

  return elementArr;
};

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
  if (dialog.open) {
    const dialogElementPosition = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogElementPosition.left ||
      e.clientX > dialogElementPosition.right ||
      e.clientY < dialogElementPosition.top ||
      e.clientY > dialogElementPosition.bottom
    )
      dialog.close();
  }

  if (target.classList.contains('delete')) {
    bookList.removeChild(target.closest('.book'));
  }

  if (target.classList.contains('open-modal')) {
    dialog.showModal();
  }

  if (target.classList.contains('add-book')) {
    addBookToLibrary(
      myLibrary,
      new Book(
        title.value,
        author.value,
        genre.value,
        +pages.value,
        statusCheckbox.checked
      )
    );
    renderBooks(bookList, myLibrary);
    setBgColorBasedOnReadingStatus(document.querySelectorAll('.status'));
  }
});

//Photo by <a href="https://unsplash.com/@chuttersnap?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">CHUTTERSNAP</a> on <a href="https://unsplash.com/photos/assorted-title-book-lot-Zf64Osndqvc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
