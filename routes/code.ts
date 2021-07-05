import { Router } from "express";
import { exec } from "child_process";
import { unlink, writeFile } from "fs";

const router = Router();

const regex =
  /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

router.post("/code", async (req, res) => {
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
  exec(deno,  (_, stdout, stderr) => {
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
