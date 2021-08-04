const d3Promise = import("d3-selection");
const jsdom = require("jsdom");
const barChart = require("./barchart");

let d3 = d3Promise.then((lib) => (d3 = lib));

const { JSDOM } = jsdom;
const document = new JSDOM().window.document;

function getBarChart(params, callback) {
    // HARDCODED: Remove addition of params.
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
