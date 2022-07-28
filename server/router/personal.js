const express = require("express");
const router = express.Router({
  mergeParams: true
});

const ROUTING = [
  {
    url: "/product/:slug_type",
    page: "/product"
  },
  {
    url: "/product/:slug_type/:slug_category",
    page: "/product"
  },
  {
    url: "/product/detail/:slug_type/:slug_category/:slug_detail",
    // page: "/productDetail"
    page: "/product/detail"
  },
  {
    url: "/promotion",
    page: "/promotion"
  },
  {
    url: "/promotion/detail/:slug_category/:slug",
    page: "/promotion/detail"
  },
  {
    url: "/cong-cu",
    page: "/tool"
  },
  {
    url: "/cong-cu/:slug_type",
    page: "/tool/detail"
  },
  {
    url: "/QnA",
    page: "/QnA"
  },
  {
    url: "/QnA/:slug_type",
    page: "/QnA"
  },
  {
    url: "/QnA/:slug_type/:slug_category",
    page: "/QnA"
  },
  {
    url: "/QnA/:slug_type/:slug_category/:slug_detail",
    page: "/QnA"
  },
];

ROUTING.forEach(route => {
  router.get(route.url, (req, res) => {
    const data = {
      ...req.params,
      ...req.data,
      ...req.query,
      lang: req.params.lang || req.data.lang
    };
    req.url = req.originalUrl;
    req.app.render(req, res, route.page, data);
  });
});

module.exports = router;
