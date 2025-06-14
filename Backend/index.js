import express from "express";
import initApp from "./src/modules/index.router.js"

const app = express();
const PORT = process.env.PORT || 3000;

initApp(app, express).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});
