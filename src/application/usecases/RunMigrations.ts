import { Migration } from "node-pg-migrate";
import MigrationsService from "../services/MigrationsService";

export default class RunMigrations {
  constructor(readonly migrationsService: MigrationsService) {}
  async execute(): Promise<Output> {
    const migrations = await this.migrationsService.runPendingMigrations();
    const output: Output = {
      migratedMigrations: [],
    };
    output.migratedMigrations = migrations.map((migration) => {
      return { name: migration.name, createdAt: migration.createdAt };
    });
    return output;
  }
}

type Output = {
  migratedMigrations: { name: string; createdAt: Date }[];
};
