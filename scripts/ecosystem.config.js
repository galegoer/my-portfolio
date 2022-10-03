module.exports = {
    apps: [
      {
        name: "server + static client",
        cwd: "../my-website/server",
        script: "node",
        args: "index.js",
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
      },
    ],
  }