const express = require("express");
const router = express.Router();
const booksy = require("./../models/book");

// send all books
router.get("/books", async function (req, res) {
  const books = await booksy.find({});
  res.json(books);
});

// send one book
router.get("/books/:id", async function (req, res) {
  const book = await booksy.findOne({ _id: req.params.id });
  res.json(book);
});

// create a new a book
router.post("/books/new", async (req, res) => {
  console.log(req.body);
  const book = new booksy({
    title: req.body.title,
    description: req.body.description,
  });
  await book.save();
  res.json(book);
});

// update a book
router.put("/books/update", async (req, res) => {
  const book = await booksy.findOne({ _id: req.body._id });
  if (book) {
    book.title = req.body.title;
    book.description = req.body.description;
    book.save();
    res.json(book);
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

// delete a book
router.delete("/books/delete", async (req, res) => {
  const book = await booksy.findOne({ _id: req.body._id });
  if (book) {
    book.delete();
    res.json({ message: "book deleted" });
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

module.exports = router;
