const http = require("http");
const { faker } = require("@faker-js/faker");

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log("Server request");
  console.log(req.url, req.method);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const delay = randomInt(1000, 3000);
  setTimeout(() => {
    if (Math.random() < 0.1) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    }
    const json = [];
    for (let i = 0; i < 20; i++) {
      json.push({
        username: faker.internet.userName(),
        number: faker.finance.accountNumber(),
      });
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ users: json }));
  }, delay);
});

server.listen(PORT, "localhost", (error) => {
  error ? console.log(error) : console.log(`listen port ${PORT}`);
});
