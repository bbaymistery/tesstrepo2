const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = false //process.env.NODE_ENV !== "production";
const app = next({ dev, dir: '.', conf: { distDir: 'build' }});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass true as the second argument to url.parse.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    // Redirect /news to /News
    if (pathname.includes( "/news/")) {
      res.writeHead(301, { Location: pathname.replace('/news/',"/News/") });
      res.end();
      return;
    }

    if (pathname === "/a") {
      app.render(req, res, "/a", query);
    } else if (pathname === "/b") {
      app.render(req, res, "/b", query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(2000, (err) => {
    if (err) throw err;
  });
});