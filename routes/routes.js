const express = require("express");
const router = express.Router();
const apiRoutes = require("./apiRoutes");
// define the home page route
router.get("/", function (req, res) {
  res.render("pages/home", { page: req.url });
});
// define the book listing page route
router.get("/books", async function (req, res) {
  res.render("pages/books", { page: req.url });
});

router.use("/api", apiRoutes);
module.exports = router;
