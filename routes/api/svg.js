const express = require("express");
const router = express.Router();

// Body of request contains data on the plot to be generated.
router.post("/", (req, res) => {
    res.json({ response: "working!" });
});

module.exports = router;
