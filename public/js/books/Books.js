import { Card } from "./Card.js";
export class Books {
  data;
  constructor(modal) {
    this.container = document.querySelector("#books");
    this.modal = modal;
    this.createButton = document.querySelector("#newBook");
    (this.header = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    }),
      this.initBooks();
  }
  initBooks() {
    this.initFetch();
    window.addEventListener("bookDeleted", this.removeBook);
    window.addEventListener("bookSaved", this.editBook);

    // open the form for creating a new book
    this.createButton.addEventListener("click", () => {
      this.modal.open();
    });
  }
  // get the books from the api
  async initFetch() {
    let r = await fetch("http://localhost:3000/api/books");
    this.data = await r.json();
    this.populate();
  }
  populate() {
    // remove old books before rendering
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }

    // render books cards and pass the modal
    this.data.forEach((book) =>
      this.container.appendChild(new Card(book, this.modal).generate())
    );
  }
  editBook = async (e) => {
    let r;
    if (e.detail.create) {
      // fetch for creating a book
      r = await fetch("http://localhost:3000/api/books/new", {
        method: "POST",
        body: new URLSearchParams({
          title: e.detail.title,
          description: e.detail.description,
        }),
        headers: this.header,
      });
    } else {
      // fetch for editing a book
      r = await fetch("http://localhost:3000/api/books/update", {
        method: "PUT",
        body: new URLSearchParams({
          _id: e.detail._id,
          title: e.detail.title,
          description: e.detail.description,
        }),
        headers: this.header,
      });
    }

    let data = await r.json();
    // find the index of the book
    let index = this.data.findIndex((book) => book._id === e.detail._id);
    if (index >= 0) {
      // replace the book
      this.data.splice(index, 1, { ...data });
      let newCard = new Card(data, this.modal).generate();
      this.container.replaceChild(newCard, this.container.children[index]);
      // add animations to the updated book
      this.container.children[index].classList.add("book-pop");
      setTimeout(
        () => this.container.children[index].classList.remove("book-pop"),
        400
      );
    } else {
      this.data.push({ ...data });
      let newCard = new Card(
        this.data[this.data.length - 1],
        this.modal
      ).generate();
      this.container.appendChild(newCard);
      // add animations when a book is added
      newCard.classList.add("book-pop");
      setTimeout(() => newCard.classList.remove("book-pop"), 400);
    }
  };
  removeBook = async (e) => {
    let r = await fetch("http://localhost:3000/api/books/delete", {
      method: "DELETE",
      body: new URLSearchParams({ _id: e.detail._id }),
      headers: this.header,
    });
    // find the index of the book
    let index = this.data.findIndex((book) => book._id === e.detail._id);
    // remove the book
    this.data.splice(index, 1);

    // add animations when a book is removed
    this.container.children[index].classList.add("book-depop");
    setTimeout(
      () => this.container.removeChild(this.container.children[index]),
      400
    );
  };
}
