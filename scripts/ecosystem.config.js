module.exports = {
  apps: [
    {
      name: "server+static_client",
      cwd: "../my-website/server",
      script: "node",
      args: "index.js",
    },
  ],
}