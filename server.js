const express = require("express");

let app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRoutes");

app.listen(PORT, function() {
    console.log("App listening on PORT" + PORT);
});