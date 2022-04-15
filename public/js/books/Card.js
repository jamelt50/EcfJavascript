export class Card {
  constructor(book, modal) {
    // create elements for the card
    this.editButton = document.createElement("button");
    this.div = document.createElement("div");
    this.wrapper = document.createElement("div");
    this.title = document.createElement("h2");
    this.description = document.createElement("p");
    this.book = book;
    this.modal = modal;
    this.generate();
    this.addModal();
  }
  // generate the card
  generate() {
    this.title.innerText = `Title: ${this.book.title}`;
    this.description.innerText = `Description: ${this.book.description}`;
    this.title.classList.add("my-3");
    this.wrapper.append(this.title, this.description, this.editButton);
    this.div.appendChild(this.wrapper);
    this.wrapper.classList.add(
      "bg-slate-300",
      "text-slate-900",
      "p-3",
      "rounded-xl"
    );
    this.div.classList.add("p-2", "w-full", "md:w-1/2", "lg:w1/3", "xl:w-1/4");
    this.editButton.classList.add(
      "bg-slate-900",
      "text-slate-50",
      "px-4",
      "py-2",
      "rounded-lg",
      "my-3"
    );
    this.editButton.innerText = "Edit";

    return this.div;
  }
  // add click event to the edit button to open the modal
  addModal() {
    this.editButton.addEventListener("click", () => {
      this.modal.open(this.book);
    });
  }
}
