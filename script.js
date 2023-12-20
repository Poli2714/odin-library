'use strict';

const mainSection = document.querySelector('.main-section');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const textInputs = document.querySelectorAll('.input');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputGenre = document.querySelector('#genre');
const inputPages = document.querySelector('#pages');
const inputReadingStatus = document.querySelector('#status');
const addBookBtn = document.querySelector('.add-book');
const saveBtn = document.querySelector('.save');
const bookList = document.querySelector('.book-list');
const statusParagraphs = document.querySelectorAll('.status');

const myLibrary = [];
let isBookAdded = false;

function Book(title, author, genre, pages, isRead) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.isRead = isRead;
}

const addBookToLibrary = function (library) {
  library.push(
    new Book(
      inputTitle.value,
      inputAuthor.value,
      inputGenre.value,
      +inputPages.value,
      inputReadingStatus.checked
    )
  );
  return library;
};

const generateBook = function (library, i) {
  const bookObj = library[i];
  const html = `<div class="book" data-bookIndex=${i}>
     <p>${bookObj.title}</p>
     <p>${bookObj.author}</p>
     <p>${bookObj.genre}</p>
     <p>${bookObj.pages}</p>
     <p class="status">${bookObj.isRead ? 'Read' : 'Not read'}</p>
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
  </div>`;

  return html;
};

const clearInputs = function () {
  textInputs.forEach(input => {
    input.attributes.value.value = input.value = '';
  });
  inputReadingStatus.checked = false;
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

  if (target.classList.contains('edit')) {
    const bookElement = target.closest('.book');

    addBookBtn.style.display = 'none';
    saveBtn.style.display = 'block';
    myLibrary.forEach((book, i) => {
      if (+bookElement.dataset.bookindex === i) {
        inputTitle.value = book.title;
        inputAuthor.value = book.author;
        inputGenre.value = book.genre;
        inputPages.value = book.pages;
        inputReadingStatus.checked = book.isRead;
      }
    });
    dialog.showModal();
  }

  if (target.classList.contains('delete')) {
    const bookElement = target.closest('.book');
    myLibrary.forEach((_, i) => {
      if (+bookElement.dataset.bookindex === i) {
        bookList.removeChild(bookElement);
        myLibrary.splice(i, 1);
      }
    });
  }

  if (target.classList.contains('open-modal')) {
    clearInputs();
    dialog.showModal();
  }

  if (target.classList.contains('add-book')) {
    const updatedLibrary = addBookToLibrary(myLibrary);
    const bookHTML = generateBook(updatedLibrary, updatedLibrary.length - 1);
    bookList.insertAdjacentHTML('beforeend', bookHTML);
    setBgColorBasedOnReadingStatus(document.querySelectorAll('.status'));
  }
});

//Photo by <a href="https://unsplash.com/@chuttersnap?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">CHUTTERSNAP</a> on <a href="https://unsplash.com/photos/assorted-title-book-lot-Zf64Osndqvc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
