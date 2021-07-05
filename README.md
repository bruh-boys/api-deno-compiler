<h1>this a simple api that execute your deno code and send you the output, has not limit per request</h1>

example request:

in deno:

```ts
const rawResponse = await fetch(
  "https://api-deno-compiler.elpanajose.repl.co/code",
  {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: "console.log(Deno)" }),
  },
);
const content = await rawResponse.json();
console.log(content.out);
```

other example with deno, with more requests:

```ts
const code = [
  `console.log("hello world")`,
  `console.log(Deno.version)`,
  `console.log("🍱 🦕")`,
  `for(let i=0;i<10;i++){console.log("number:",i)}`,
  `this would have an error`
];

for (let i = 0; i < 10; i++) {
  const rawResponse = await fetch(
    "https://api-deno-compiler.elpanajose.repl.co/code",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: `${code[Math.floor(Math.random() * code.length)]}`,
      }),
    }
  );
  const content = await rawResponse.json();
  console.log(content.out);
}
```

in python:

```py
import threading
import requests

msg = """
console.log(Deno)
"""

url = "https://api-deno-compiler.elpanajose.repl.co/code"
myobj = {"code":msg}

class ThreadClass(threading.Thread):

  def run(self):
    x = requests.post(url, data = myobj)
    print(x.text)

for i in range(2):
  t = ThreadClass()
  t.start()

```

in go:
```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	postBody, _ := json.Marshal(map[string]string{
		"code": "console.log(Deno.version)",
	})
	responseBody := bytes.NewBuffer(postBody)
	resp, err := http.Post("https://api-deno-compiler.elpanajose.repl.co/code", "application/json", responseBody)
	if err != nil {
		log.Fatalf("An Error Occured %v", err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	sb := string(body)
	fmt.Printf(sb)
}
```
<h1>Used in:</h1>

- Deno online compiler : https://deno-online-compiler.herokuapp.com/

- dino-bot : https://github.com/ELPanaJose/dino-bot
