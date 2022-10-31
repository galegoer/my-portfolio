module.exports = {
  apps: [
    {
      name: "server+client",
      cwd: "../my-website/client",
      script: "/home/ec2-user/.nvm/versions/node/v19.0.0/lib/node_modules/npm/bin/npm-cli.js",
      args: "start",
    },
  ],
}