const getChartButton = document.getElementById("load-svg-button");
const loadDataButton = document.getElementById("load-data-button");

getChartButton.addEventListener("click", getChart);
loadDataButton.addEventListener("click", loadData);

function getChart() {
    const contentBox = document.getElementById("content");

    // NOTE: {data, parentID, height, width, xVar, yVar, xAxisLabel, yAxisLabel} is the data needed from in order to plot the bar chart. (ultimately every other )

    data = {
        height: contentBox.offsetHeight * 0.8,
        width: contentBox.offsetWidth * 0.8,
        chartType: "bar chart", // HARDCODED for now
        parentID: contentBox.id,
        parentClass: contentBox.className,
        colorScheme: "empty", // HARDCODED: TODO: Add color selection feature.
    };

    console.log(data);

    options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    fetch("/api/svg", options)
        .then((res) => res.json())
        .then((data) => {
            contentBox.outerHTML = `${data.chart}`;
        })
        .catch((err) => console.log(err));
}

function loadData() {
    // NOT IMPLEMENTED YET
}
