const { createApp } = require("./app.js");

const startServer = (PORT) => {
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
}

startServer(7000);
