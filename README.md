<h1>this a simple api that execute your deno code and send you the output, has a rate limit of 10 request per minute</h1>

example request:

in deno:

```ts
(async () => {
  const rawResponse = await fetch("https://api-deno-compiler.elpanajose.repl.co/code", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({code: "console.log(Deno)"})
  });
  const content = await rawResponse.json();
  console.log(content)

})();
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

