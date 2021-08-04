const d3Promise = import("d3");

let d3 = d3Promise.then((lib) => (d3 = lib));

class BarChart {
    constructor({
        data,
        parentID,
        height,
        width,
        xVar,
        yVar,
        xAxisLabel,
        yAxisLabel,
        colorScheme,
    }) {
        this.data = data;
        this.parentID = parentID;
        this.height = height * 0.8;
        this.width = width * 0.8;
        this.xVar = xVar; // xVar is the variable selected by the user to be on the x axis
        this.yVar = yVar; // yVar is the variable selected by the user to be on the y axis
        this.xAxisLabel = xAxisLabel;
        this.yAxisLabel = yAxisLabel;
        this.colorScheme = colorScheme;
    }

    render(selection) {
        const MARGINS = { top: 20, bottom: 10, left: 20, right: 10 };
        const CHART_WIDTH = this.width;
        const CHART_HEIGHT = this.height - MARGINS.top - MARGINS.bottom;

        const xScale = d3
            .scaleBand()
            .domain(this.data.map((dataPoint) => dataPoint[this.xVar]))
            .rangeRound([0, CHART_WIDTH])
            .padding(0.1);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.data, (d) => d[this.yVar]) + 3])
            .range([CHART_HEIGHT, 0]);

        const xAxis = d3
            .axisBottom()
            .scale(xScale)
            .tickSizeInner(0)
            .tickSizeOuter(0);

        const yAxis = d3
            .axisLeft()
            .scale(yScale)
            .tickSizeInner(0)
            .tickSizeOuter(0);

        const chart = selection
            .append("svg")
            .attr("width", CHART_WIDTH)
            .attr("height", CHART_HEIGHT + MARGINS.top + MARGINS.bottom)
            .append("g")
            .attr("transform", `translate(${MARGINS.left}, ${MARGINS.bottom})`);

        chart
            .append("g")
            .call(xAxis)
            .attr("transform", `translate(0, ${CHART_HEIGHT})`)
            .attr("color", "#000000"); // TODO replace the color with a user-determined color scheme.

        chart.append("g").call(yAxis).attr("color", "#000000");

        chart
            .selectAll(".bar")
            .data(this.data, (data) => data._id)
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("width", xScale.bandwidth())
            .attr("height", (data) => CHART_HEIGHT - yScale(data[this.yVar]))
            .attr("x", (data) => xScale(data[this.xVar]))
            .attr("y", (data) => yScale(data[this.yVar]))
            .attr("fill", "#FF8C00"); // TODO replace the color with a user-determined color scheme.

        chart
            .selectAll(".label")
            .data(this.data, (data) => data._id)
            .enter()
            .append("text")
            .text((data) => data.value)
            .attr(
                "x",
                (data) => xScale(data[this.xVar]) + xScale.bandwidth() / 2
            )
            .attr("y", (data) => yScale(data[this.yVar]) - 20)
            .attr("text-anchor", "middle")
            .classed("label", true);
    }
}

module.exports = BarChart;
