import express from "express";
import { PgPromiseAdapter } from "./DatabaseConnection";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", async (req, res) => {
  const database = new PgPromiseAdapter();
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

app.listen(PORT, () => console.log(`Listenning on port ${PORT}`));
