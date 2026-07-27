const myLibrary = [];
const libraryContainer = document.querySelector(".library-container");
const nbBtn = document.getElementById("new-book-btn");
const nbDialog = document.getElementById("new-book-dialog");
const nbForm = nbDialog.querySelector("form");
const confirmBtn = document.getElementById("confirm-btn");
const cancelBtn = document.getElementById("cancel-btn");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBook();
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("card", book.read ? "read" : "unread");
  card.dataset.id = `${book.id}`;

  const title = document.createElement("h3");
  title.classList.add("book-title");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.classList.add("book-author");
  author.textContent = `by ${book.author}`;

  const pages = document.createElement("p");
  pages.classList.add("book-pages");
  pages.textContent = `${book.pages} pages`;

  const status = document.createElement("span");
  status.classList.add("book-status", book.read ? "read" : "unread");
  status.textContent = book.read ? "Read" : "Not read yet";

  const actions = document.createElement("div");
  actions.classList.add("book-actions");

  const readBtn = document.createElement("button");
  readBtn.classList.add("read-btn");
  readBtn.textContent = book.read ? "Unread" : "Read";
  readBtn.addEventListener("click", () => {
    book.toggleRead();
    displayBook();
  });

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    removeBook(book.id);
  });

  actions.append(readBtn, removeBtn);
  card.append(title, author, pages, status, actions);
  return card;
}

function displayBook() {
  libraryContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    const card = createBookCard(book);

    libraryContainer.appendChild(card);
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }

  displayBook();
}

nbBtn.addEventListener("click", () => {
  nbDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  nbDialog.close();
  nbForm.reset();
});

nbForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  nbDialog.close();
  nbForm.reset();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);
addBookToLibrary("Genshin Impact: Teyvat Chronicles", "miHoYo", 128, false);
displayBook();
