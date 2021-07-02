import express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes/code"));
app.get("/", (_, res) => {
  res.send(`<h1 align="center">welcome! go to /code</h1>`);
});

app.get("/code", (_, res) => {
  res.send(
    `<div align="center">make a http post request with the param code, more info in <a href="https://github.com/ELPanaJose/api-deno-compiler">GitHub Repository.</a></div>`,
  );
});

app.listen(PORT, () => console.log(`api on http://localhost:${PORT}`));
