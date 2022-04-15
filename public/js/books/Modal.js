import { Form } from "./Form.js";
export class Modal {
  // create elements for the modal
  constructor() {
    this.container = document.querySelector("#modal");
    this.shadow = document.createElement("div");
    this.closeButton = document.createElement("button");
    this.modal = document.createElement("div");
    this.title = document.createElement("h2");
    this.book = null;
    window.addEventListener("bookSaved", this.close);
    window.addEventListener("bookDeleted", this.close);
    this.closeButton.addEventListener("click", this.close);
  }
  // generate the modal
  generate() {
    this.closeButton.classList.add(
      "text-slate-900",
      "bg-slate-50",
      "px-4",
      "fixed",
      "right-5",
      "top-5",
      "font-bold",
      "rounded-2xl",
      "text-3xl",
      "hover:opacity-80",
      "z-20"
    );
    this.closeButton.innerText = "X";
    this.shadow.classList.add(
      "fixed",
      "top-0",
      "left-0",
      "min-h-screen",
      "w-full",
      "z-10",
      "backdrop"
    );
    this.modal.classList.add(
      "fixed",
      "top-1/2",
      "left-1/2",
      "bg-slate-50",
      "rounded-lg",
      "transform",
      "-translate-x-1/2",
      "-translate-y-1/2",
      "z-20",
      "text-slate-900",
      "border",
      "border-slate-50",
      "shadow-lg",
      "flex",
      "flex-col",
      "items-stretch",
      "justify-center",
      "overflow-hidden"
    );
    this.title.classList.add("font-bold", "text-2xl", "p-3", "text-center");
    this.modal.append(this.title, new Form(this.book));
  }

  // open the modal
  open = (book = null) => {
    if (book) {
      this.book = book;
    }
    this.generate();
    this.container.append(this.modal, this.shadow, this.closeButton);
    this.title.innerText = this.book ? this.book.title : "Create a new Book";
  };
  // close the modal
  close = () => {
    this.book = null;
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    while (this.modal.firstChild) {
      this.modal.removeChild(this.modal.firstChild);
    }
  };
}
