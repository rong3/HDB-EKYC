const express = require("express");
const router = express.Router({
  mergeParams: true
});
const PersonalCorporate = require("./personal");

function getParam(req) {
  return {
    ...req.params,
    ...req.data,
    ...req.query,
    lang: req.params.lang || req.data.lang
  };
}

router.use("/:customer_type(personal|corporate)", PersonalCorporate);

const ROUTING = [
  {
    url: "/:slug_type(personal|corporate)/product",
    page: "/product"
  },
  {
    url: "/:slug_type(personal|corporate)",
    page: "/product"
  },
  {
    url: "/:customer_type(about)",
    page: "/about"
  },
  {
    url: "/news",
    page: "/news"
  },
  {
    url: "/news/:slug_category",
    page: "/news"
  },
  {
    url: "/news/detail/:slug_category/:slug",
    page: "/news/detail"
  },
  {
    url: "/:customer_type(about)/:slug_type",
    page: "/aboutDetail"
  },
  {
    url: "/:customer_type(investor)",
    page: "/investor"
  },
  {
    url: "/:customer_type(investor)/:slug_type/:slug_category",
    page: "/investor/detail"
  },
  {
    url: "/:customer_type(investor)/:slug_type/:slug_category/:slug_detail",
    page: "/investor/detail"
  },
  {
    url: "/:customer_type(investor)/:slug_type/:slug_category/:slug_detail/:slug_sub_category/:slug_post",
    page: "/investor/detail"
  },
  {
    url: "/mobile_login",
    page: "/loading-fake"
  },
  {
    url: "/mobile_register",
    page: "/loading-fake"
  },
  {
    url: "/mobile_notification",
    page: "/loading-fake"
  },
  // {
  //   url: "/:slugCategory/:slug",
  //   page: "/news/detail"
  // },
  {
    url: "/contact/chi-nhanh-va-atm",
    page: "/atm-branch"
  },
  {
    url: "/contact",
    page: "/contact"
  },
  {
    url: "/atm-branch",
    page: "/atm-branch"
  },
  {
    url: "/:customer_type(personal|corporate)/promotion/all",
    page: "/promotion"
  },
  {
    url: "/:page_type(mobile-app)/:slug_type",
    page: "/mobileApp"
  },
  {
    url: "/s/:link",
    page: "/shortlink"
  },
  {
    url: "/qrcode",
    page: "/qrcode"
  },
  {
    url: "/decryptAPI",
    page: "/decryptAPI"
  },
  {
    url: "/term",
    page: "/term"
  },
  {
    url: "/sitemap",
    page: "/sitemap"
  },
  {
    url: "/priority",
    page: "/priority"
  },
  {
    url: "/webpush/subscription",
    page: "/admin/subscription"
  },
];

ROUTING.forEach(route => {
  router.get(route.url, (req, res) => {
    const queryParams = getParam(req);
    req.url = req.originalUrl;
    req.app.render(req, res, route.page, queryParams);
  });
});
router.get("/", (req, res) => {
  const queryParams = getParam(req);
  req.app.render(req, res, "/", queryParams);
});

module.exports = router;
