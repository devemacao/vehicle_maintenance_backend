import * as migrationRunner from "node-pg-migrate";
import MigrationsService from "../../application/services/MigrationsService";
import Migration from "../../domain/Migration";

export default class MigrationServiceNodePgMigrate
  implements MigrationsService
{
  private options: any;

  constructor() {
    this.options = {
      databaseUrl: process.env.DATABASE_URL,
      dir: "src/migrations",
      direction: "up",
      migrationsTable: "pgmigrations",
      dryRun: true,
      log: () => {},
    } as migrationRunner.RunnerOption;
  }

  async listPendingMigrations(): Promise<Migration[]> {
    const pendingMigrations = await migrationRunner.runner(this.options);
    const migrations = pendingMigrations.map(
      (migration) =>
        new Migration(migration.name, new Date(migration.timestamp))
    );
    return migrations;
  }
}
