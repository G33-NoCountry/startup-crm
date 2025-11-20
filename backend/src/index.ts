import "dotenv/config";
import express from "express";
import cors from "cors";
import { sequelize } from "./config/database.config";
import { appConfig } from "./config/app.config";
import { corsConfig } from "./config/cors.config";
import { setupAssociations } from "./models";
import router from "./routes/index";
import swagger from "swagger-ui-express";
import swaggerConfig from "./docs/swagger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));

app.use("/api", router);

app.use("/api/docs", swagger.serve,
    swagger.setup(swaggerConfig, {
        explorer: true,
        // customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "Startup CRM API Documentation",
    })
);

async function initializeDatabase() {
  try {

    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    setupAssociations();
  } catch (error) {
    console.error("❌ Unable to connect to the database: ", error);
  }
};

const startServer = async () => {
  await initializeDatabase();

  app.listen(appConfig.port, () => {
    console.log(`🚀 Server listening on port: ${appConfig.port}`);
    console.log(`🌍 Environment: ${appConfig.nodeEnv}`);
    console.log(`📚 API Documentation: http://localhost:${appConfig.port}/api/docs`);
    console.log(`📄 Swagger JSON: http://localhost:${appConfig.port}/api.json`);
  });
};

startServer()
  .catch((error) => {
    console.error("❌ Failed to start server:", error);
  });

export default app;