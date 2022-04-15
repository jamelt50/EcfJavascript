export class Form {
  // create elements for the form
  constructor(book = null) {
    this.form = document.createElement("form");
    this.title = document.createElement("input");
    this.description = document.createElement("textarea");
    this.deleteButton = document.createElement("button");
    this.actionButton = document.createElement("button");
    this.deleteButton.addEventListener("click", this.delete);
    this.actionButton.addEventListener("click", this.save);
    this.book = book;
    return this.generate();
  }
  // generate the form
  generate() {
    this.form.classList.add("p-2", "bg-slate-900");
    this.title.setAttribute("placeholder", "Title");
    this.title.classList.add(
      "p-1",
      "my-2",
      "rounded-lg",
      "bg-slate-50",
      "text-slate-900",
      "w-full"
    );
    this.description.classList.add(
      "p-1",
      "my-2",
      "rounded-lg",
      "bg-slate-50",
      "text-slate-900",
      "w-full"
    );
    this.actionButton.classList.add(
      "px-4",
      "py-2",
      "bg-slate-50",
      "text-slate-900",
      "font-bold",
      "rounded-lg",
      "block",
      "mx-auto",
      "my-4"
    );
    this.actionButton.innerText = this.book ? "Save" : "Create";
    if (this.book) {
      this.title.value = this.book.title ? this.book.title : "";
      this.description.value = this.book.description
        ? this.book.description
        : "";
      this.deleteButton.classList.add(
        "px-4",
        "py-2",
        "bg-red-900",
        "text-slate-50",
        "font-bold",
        "rounded-lg",
        "block",
        "mx-auto"
      );
      this.deleteButton.innerText = "Delete Book";
    }
    this.description.setAttribute("placeholder", "Description");
    this.form.append(
      this.title,
      this.description,
      this.actionButton,
      this.deleteButton
    );
    return this.form;
  }
  // dispatch delete event with the id of the book

  delete = (e) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("bookDeleted", {
        detail: { _id: this.book._id },
      })
    );
  };
  // dispatch edit event with the book's new data
  save = (e) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("bookSaved", {
        detail: {
          _id: this.book ? this.book._id : "",
          title: this.title.value,
          description: this.description.value,
          create: this.book ? false : true,
        },
      })
    );
  };
}
