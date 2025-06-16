import express, { Request, Response } from "express";
import DatabseConnectionPgPromise from "./infra/services/DatabaseConnectionPgPromise";
import NodePgMigrateService from "./infra/services/MigrationServiceNodePgMigrate";
import MigrationsController from "./infra/controllers/MigrationsController";
import GetMigrations from "./application/usecases/GetMigrations";

const PORT = process.env.PORT || 3000;

const app = express();

const migrationsService = new NodePgMigrateService();
const getMigrations = new GetMigrations(migrationsService);
const migrationsController = new MigrationsController(getMigrations);

app.get("/", async (req, res) => {
  const database = new DatabseConnectionPgPromise();
  try {
    const [databaseVersionResult] = await database.query(
      "SHOW server_version;",
      []
    );
    res.json({
      message: "Database connection successful",
      version: databaseVersionResult.server_version,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: "Failed to connect to the database" });
  } finally {
    await database.close();
  }
});

app.use("/migrations", migrationsController.router);

app.listen(PORT, () => console.log(`Listenning on port ${PORT}`));
