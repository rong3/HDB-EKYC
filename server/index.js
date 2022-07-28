const express = require('express'); // Sử dụng framework express
var serveStatic = require('serve-static');
var path = require('path');
const next = require('next'); // Include module next
const compression = require('compression');
const port = parseInt(process.env.PORT, 10) || 3000; // Port để chạy app Nextjs, cũng là server nodejs
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const router = require('./router');
const mobileDetect = require('mobile-detect');
const bodyParser = require("body-parser");

function setCustomCacheControl(res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0');
  }
}

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses if this request header is present
    return false;
  }
  // fallback to standard compression
  return compression.filter(req, res);
};

async function bootstrap() {
  app.prepare().then(() => {
    const handle = app.getRequestHandler();
    const server = express();

    const middlewareServer = (req, res, next) => {
      let md = new mobileDetect(req.headers['user-agent']);
      req.data = {
        lang: null,
        device: md.mobile(),
        os: md.os(),
      };
      req.app = app;
      next();
    }

    server.use(bodyParser.urlencoded({
      extended: true
    }));

    server.use(bodyParser.json());

    server.use(
      compression({
        // filter decides if the response should be compressed or not,
        // based on the `shouldCompress` function above
        filter: shouldCompress,
        // threshold is the byte threshold for the response body size
        // before compression is considered, the default is 1kb
        threshold: 0,
      }),
      serveStatic(path.join(__dirname, '/../public'), {
        maxAge: '1d',
        setHeaders: setCustomCacheControl,
      }),
    );

    //Tạo ra các router. Dòng này có ý nghĩa khi gửi request đến path /a . Sẽ render file /a.js trong thư mục pages/a.js của Nextjs
    server.use(
      '/',
      (req, res, next) => {
        middlewareServer(req, res, next)
      },
      router,
    );

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
    server.maxConnections = 8192;
  });
}

bootstrap().catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
