const express = require("express");
const router = express.Router();
const dataToReturn = require("../../server/data/data2.json");

// Body of request contains data on the plot to be generated.
router.get("/", (req, res) => {
    res.send({ data: dataToReturn });
});

module.exports = router;
