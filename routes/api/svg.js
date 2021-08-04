const express = require("express");
const router = express.Router();
const getBarChart = require("../../server/src/barchart/barchartgenerator");

// Body of request contains data on the plot to be generated.
router.post("/", (req, res) => {
    // TODO: validate req.body using Joi
    getBarChart(req.body, (outerHTHML) => {
        res.json({ chart: outerHTHML });
    });
});

module.exports = router;
