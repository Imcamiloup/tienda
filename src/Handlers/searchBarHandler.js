const { searchBarController } = require("../Controller/searchBarControllers");

const searchBarHandler = async (req, res) => {
  const { typeSearch } = req.query;

  try {
    const searchResults = await searchBarController(typeSearch);
    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  searchBarHandler,
};
