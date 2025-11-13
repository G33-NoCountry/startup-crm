import "dotenv/config";
import express from "express";
import { appConfig } from "./config/app.config";
import router from "./routes/index";
import cors from "cors";
import { corsConfig } from "./config/cors.config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));

app.use("/api", router);

const startServer = async () => {
  app.listen(appConfig.port, () => {
    console.log(`🚀 Server listening on port: ${appConfig.port}`);
    console.log(`🌍 Environment: ${appConfig.nodeEnv}`);
    console.log(`📚 API Documentation: http://localhost:${appConfig.port}/api/docs`);
    console.log(`📄 Swagger JSON: http://localhost:${appConfig.port}/api.json`);
  });
};

startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});

export default app;