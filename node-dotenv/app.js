const puppeteer = require('puppeteer');

require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/');

  page.setViewport({width: 1300, height: 2000, deviceScaleFactor: 1});

  await page.screenshot({path: `screenshot${Date.now()}.png`});
  await browser.close();
}) ();

// console.log(process.env.MESSAGE);
/* const http = require('node:http');

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); */
