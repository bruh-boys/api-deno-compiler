import express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes/code"));
app.listen(PORT, () => console.log(`api on http://localhost:${PORT}`));
