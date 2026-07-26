const myLibrary = [
  {
    title: "title1",
    author: "author1",
    pages: 123,
    read: "Read",
    bookId: "sdfsdfsdf",
  },
  {
    title: "title1",
    author: "author1",
    pages: 123,
    read: "Unread",
    bookId: "dssdffgrgw",
  },
  {
    title: "title1",
    author: "author1",
    pages: 123,
    read: "Read",
    bookId: "awrgagegweg",
  },
];
const displayBookContainer = document.getElementById("display-book");
const nbBtn = document.getElementById("new-book-btn");
const nbDialog = document.getElementById("new-book");
const nbForm = nbDialog.querySelector("form");
const confirmBtn = document.getElementById("confirm-btn");
const cancelBtn = document.getElementById("cancel-btn");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.bookId = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBook();
}

function displayBook() {
  displayBookContainer.innerHTML = "";
  myLibrary.forEach((b) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = `${b.bookId}`;
    const ul = document.createElement("ul");

    Object.entries(b).forEach(([key, value]) => {
      if (key === "bookId") {
        return;
      }
      const li = document.createElement("li");
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
      li.innerHTML = `<strong>${formattedKey}</strong>: ${value}`;
      ul.append(li);
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => {
      removeBook(b.bookId);
    });

    const readBtn = document.createElement("button");
    readBtn.classList.add("read-btn");
    readBtn.textContent = b.read === "Read" ? "Unread" : "Read";
    readBtn.addEventListener("click", () => {
      hasRead(b);
    });

    card.append(ul);
    card.appendChild(readBtn);
    card.appendChild(removeBtn);

    displayBookContainer.appendChild(card);
  });
}

function hasRead(b) {
  b.read = b.read === "Read" ? "Unread" : "Read";
  displayBook();
}

nbBtn.addEventListener("click", () => {
  nbDialog.showModal();
});

nbForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(nbForm);
  const bookData = Object.fromEntries(formData.entries());
  const newBook = addBookToLibrary(
    bookData.title,
    bookData.author,
    bookData.pages,
    bookData.read || "Unread",
  );

  nbDialog.close();
  nbForm.reset();
});

cancelBtn.addEventListener("click", () => {
  nbDialog.close();
  nbForm.reset();
});

function removeBook(bookId) {
  const index = myLibrary.findIndex((book) => book.bookId === bookId);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }

  displayBook();
}
displayBook();
