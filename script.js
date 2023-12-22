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

const myLibrary = [
  {
    title: 'Les Misérables',
    author: 'Victor Hugo',
    genre: 'Classics',
    pages: 1456,
    isRead: false,
  },
  {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    genre: 'Classics',
    pages: 1736,
    isRead: true,
  },
  {
    title: 'The Count of Monte Cristo',
    author: 'Alexandre Dumas',
    genre: 'Classics',
    pages: 1240,
    isRead: true,
  },
];
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

const displayBookPages = function (pageNumbers) {
  return pageNumbers ? `${pageNumbers} pgs` : 'n/a';
};

const generateBookHTML = function (bookObj, i) {
  const html = `<div class="book" data-bookIndex=${i}>
     <p class="title">${bookObj.title}</p>
     <p class="author">${bookObj.author}</p>
     <p class="genre">${bookObj.genre}</p>
     <p class="pages">${displayBookPages(bookObj.pages)}</p>
     <p class="status">${bookObj.isRead ? 'Read' : 'Not read'}</p>
     <p class="edit-remove">
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

const setBgColorBasedOnReadingStatus = function (elementArr) {
  elementArr.forEach(element => {
    element.style.backgroundColor = `${
      element.textContent === 'Read' ? '#caffbf' : '#ffadad'
    }`;
  });

  return elementArr;
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

const areAllInputsValid = function (inputs) {
  for (const input of inputs) {
    if (!input.validity.valid) return false;
  }
  return true;
};

const editBookDetails = function (bookElement) {
  editedBookIndex = +bookElement.dataset.bookindex;
  myLibrary.forEach((book, i) => {
    if (editedBookIndex === i) {
      inputTitle.attributes.value.value = inputTitle.value = book.title;
      inputAuthor.attributes.value.value = inputAuthor.value = book.author;
      inputGenre.attributes.value.value = inputGenre.value = book.genre;
      inputPages.attributes.value.value = inputPages.value = book.pages;
      inputReadingStatus.checked = book.isRead;
    }
  });
  dialog.showModal();
};

const saveChangesToLibrary = function (myLibrary) {
  const newBookObj = new Book(
    inputTitle.value,
    inputAuthor.value,
    inputGenre.value,
    +inputPages.value,
    inputReadingStatus.checked
  );
  myLibrary.splice(editedBookIndex, 1, newBookObj);
  return myLibrary;
};

const changeReadingStatus = function (statusParagraph, library) {
  const bookElement = statusParagraph.closest('.book');
  library.forEach((book, i) => {
    if (+bookElement.dataset.bookindex === i) {
      book.isRead = !book.isRead;
      statusParagraph.textContent = book.isRead ? 'Read' : 'Not read';
      statusParagraph.style.backgroundColor = `${
        statusParagraph.textContent === 'Read' ? '#caffbf' : '#ffadad'
      }`;
    }
  });
};

const closeDialogIfClickedOutside = event => {
  const dialogElementPosition = dialog.getBoundingClientRect();
  if (
    event.clientX < dialogElementPosition.left ||
    event.clientX > dialogElementPosition.right ||
    event.clientY < dialogElementPosition.top ||
    event.clientY > dialogElementPosition.bottom
  ) {
    dialog.close();
    isBookAdded = false;
  }
};

renderAllBooks(myLibrary, bookList);

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
    closeDialogIfClickedOutside(e);
  }

  if (target.classList.contains('open-modal')) {
    if (addBookBtn.style.display === 'none' || isBookAdded) {
      clearInputs();
      addBookBtn.style.display = 'block';
      saveBtn.style.display = 'none';
    }
    dialog.showModal();
  }

  if (target.classList.contains('add-book')) {
    if (areAllInputsValid(textInputs)) {
      isBookAdded = true;
      const updatedLibrary = addNewBookToLibrary(myLibrary);
      renderAllBooks(updatedLibrary, bookList);
    }
  }

  if (target.classList.contains('edit')) {
    saveBtn.style.display = 'block';
    addBookBtn.style.display = 'none';
    const bookElement = target.closest('.book');
    editBookDetails(bookElement);
  }

  if (target.classList.contains('save')) {
    if (areAllInputsValid(textInputs)) {
      const updatedLibrary = saveChangesToLibrary(myLibrary);
      renderAllBooks(updatedLibrary, bookList);
    }
  }

  if (target.classList.contains('remove')) {
    const bookElement = target.closest('.book');
    const updatedLibrary = removeBookFromLibrary(bookElement, myLibrary);
    renderAllBooks(updatedLibrary, bookList);
  }

  if (target.classList.contains('status')) {
    changeReadingStatus(target, myLibrary);
  }
});
