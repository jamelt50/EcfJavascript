import { Books } from "./books/Books.js";
import { Modal } from "./books/Modal.js";

// create a new modal
const modal = new Modal();

// create a new Book listing and pass the modal
const books = new Books(modal);
