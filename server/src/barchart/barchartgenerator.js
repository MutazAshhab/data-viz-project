// const d3 = import("d3")
//     .then((d3) => d3 = d3)
//     .catch((err) => err);
const d3Promise = import("d3-selection");
const jsdom = require("jsdom");
const barChart = require("./barchart");

const fs = require("fs");
const util = require("util");

let d3 = d3Promise.then((lib) => (d3 = lib));

// HARDCODED: Remove data import
// TODO remove hardcoded data.
const data2 = require("../../data/data2.json");

const { JSDOM } = jsdom;
const document = new JSDOM().window.document;

// NOTE: Use JSdom to create an HTML <body> DOM element on which D3js could hook
function getBarChart(params, callback) {
    // HARDCODED: Remove addition of params.
    // TODO remove hardcoded data2.
    params["data"] = data2;
    params["xVar"] = "region";
    params["yVar"] = "value";
    params["xAxisLabel"] = "x-label";
    params["yAxisLabel"] = "y-label";

    const chart = new barChart(params);

    d3.select(document.body)
        .append("div")
        .attr("id", params.parentID)
        .attr("class", params.parentClass)
        .call(chart.render.bind(chart));

    const chartOuterHTML = d3
        .select(document.getElementById(params.parentID))
        .node().outerHTML;

    d3.select(document.getElementById(params.parentID)).remove();

    callback(chartOuterHTML);
}

module.exports = getBarChart;
