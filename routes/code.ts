import { Router } from "express";
import { exec } from "child_process";
import { unlink, writeFile } from "fs";
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit 60 request for minute
  message: ({ out: "HTTP ERROR 429 to many requests" }),
});

const router = Router();

const regex =
  /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

router.post("/code", limiter, async (req, res) => {
  const { code } = req.body;

  const randomfile = (`${Math.random()}.ts`);
  const deno = `./deno run --allow-net --no-check  ${randomfile}`;
  // create the file
  writeFile(randomfile, code, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  // exec the code
  exec(deno, { timeout: 500 }, (_, stdout, stderr) => {
    let out = (stdout || stderr).replace(regex, "");
    console.log(out);
    res.json({ // send the output
      out: out,
    });
    // delete the file
    unlink(randomfile, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
});

module.exports = router;
