import { Router } from "express";
import { exec } from "child_process";
import { writeFile } from "fs";
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit 10 request for minute
  message: ({out:"HTTP ERROR 429 to many requests"}),
});

const router = Router();
const deno = "./deno run --allow-net --no-check  execute.ts";

const regex =
  /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

router.post("/code", limiter, async (req, res) => {
  const { code } = req.body;

  writeFile("execute.ts", code, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  exec(deno, { timeout: 2000 }, (_, stdout, stderr) => {
    let out = (stdout || stderr).replace(regex, "");
    console.log(out);
    res.json({
      out: out,
    });
  });
});

module.exports = router;
