const express = require("express");
const path = require("path");

app = express();

app.use(express.json({ limit: "1mb" }));

app.use(express.static(path.join(__dirname, "server", "public")));

app.use("/api/svg", require("./routes/api/svg"));

PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
