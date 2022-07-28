module.exports = {
    apps: [
      {
        name: "HDBANK_WEBSITE",
        script: "./server/index.js",
        watch: false,
        instances: "max",
        exec_mode: "cluster",
        env: {
          NODE_ENV: "production",
          NEXT_APP_ENV: "production",
          BASE_URL: "https://webuat.hdbank.com.vn/api",
        }
      }
    ]
  };
  