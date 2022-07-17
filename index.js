const { createApp } = require("./src/app.js");

const startServer = (PORT) => {
  const app = createApp({ sessions: {} });

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
}

startServer(7000);
