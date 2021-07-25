const getSVGButton = document.getElementById("load-svg-button");

getSVGButton.addEventListener("click", getSVG);

function getSVG() {
    data = {
        height: document.querySelector(".content").offsetHeight,
        width: document.querySelector(".content").offsetWidth,
    };

    options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    fetch("/api/svg", options)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
}
