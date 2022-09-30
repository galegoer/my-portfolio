module.exports = {
    apps: [
      {
        name: "client",
        cwd: "../my-website/client",
        script: "npm",
        args: "start",
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
      },
      {
        name: "server",
        cwd: "../my-website/server",
        script: "node index.js",
        args: "start",
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
      },
    ],
  }