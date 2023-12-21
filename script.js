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
let editedBookIndex;
let isBookAdded = false;

function Book(title, author, genre, pages, isRead) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.isRead = isRead;
}

const addNewBookToLibrary = function (library) {
  const newBook = new Book(
    inputTitle.value,
    inputAuthor.value,
    inputGenre.value,
    +inputPages.value,
    inputReadingStatus.checked
  );
  library.push(newBook);
  return library;
};

const generateBookHTML = function (bookObj, i) {
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
          class="remove action"
          src="./assets/delete.svg"
          alt="remove icon"
          width="25"
        />
      </button>
    </p>
  </div>`;

  return html;
};

const renderAllBooks = function (library, bookList) {
  const allBookElements = document.querySelectorAll('.book');
  allBookElements.forEach(bookEl => bookList.removeChild(bookEl));

  library.forEach((book, i) => {
    const newBookHTML = generateBookHTML(book, i);
    bookList.insertAdjacentHTML('beforeend', newBookHTML);
  });
  setBgColorBasedOnReadingStatus(document.querySelectorAll('.status'));
};

const removeBookFromLibrary = function (bookElement, library) {
  library.forEach((_, i) => {
    if (+bookElement.dataset.bookindex === i) {
      library.splice(i, 1);
    }
  });
  return library;
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
    ) {
      dialog.close();
      if (addBookBtn.style.display === 'none') {
        saveBtn.style.display = 'none';
        addBookBtn.style.display = 'block';
      }
    }
  }

  if (target.classList.contains('open-modal')) {
    clearInputs();
    dialog.showModal();
  }

  if (target.classList.contains('add-book')) {
    const updatedLibrary = addNewBookToLibrary(myLibrary);

    renderAllBooks(updatedLibrary, bookList);
  }

  if (target.classList.contains('edit')) {
    const bookElement = target.closest('.book');
    editedBookIndex = +bookElement.dataset.bookindex;

    addBookBtn.style.display = 'none';
    saveBtn.style.display = 'block';
    myLibrary.forEach((book, i) => {
      if (editedBookIndex === i) {
        inputTitle.value = book.title;
        inputAuthor.value = book.author;
        inputGenre.value = book.genre;
        inputPages.value = book.pages;
        inputReadingStatus.checked = book.isRead;
      }
    });
    dialog.showModal();
  }

  if (target.classList.contains('save')) {
    const newBookObj = new Book(
      inputTitle.value,
      inputAuthor.value,
      inputGenre.value,
      +inputPages.value,
      inputReadingStatus.checked
    );
    myLibrary.splice(editedBookIndex, 1, newBookObj);
    renderAllBooks(myLibrary, bookList);
  }

  if (target.classList.contains('remove')) {
    const bookElement = target.closest('.book');
    const updatedLibrary = removeBookFromLibrary(bookElement, myLibrary);

    renderAllBooks(updatedLibrary, bookList);
  }

  if (target.classList.contains('status')) {
    const bookElement = target.closest('.book');
    myLibrary.forEach((book, i) => {
      if (+bookElement.dataset.bookindex === i) {
        book.isRead = !book.isRead;
        target.textContent = book.isRead ? 'Read' : 'Not read';
        target.style.backgroundColor = `${
          target.textContent === 'Read' ? '#caffbf' : '#ffadad'
        }`;
      }
    });
  }
});

//Photo by <a href="https://unsplash.com/@chuttersnap?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">CHUTTERSNAP</a> on <a href="https://unsplash.com/photos/assorted-title-book-lot-Zf64Osndqvc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
