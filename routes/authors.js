const express = require("express");
const router = express.Router();
const Author = require("../models/author");

router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.search != null && req.query.search != "") {
    searchOptions.name = new RegExp(req.query.search, 'i');
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, search: req.query.search });
  } catch {
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//Create a new author
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error Creating Author",
    });
  }
});

module.exports = router;
