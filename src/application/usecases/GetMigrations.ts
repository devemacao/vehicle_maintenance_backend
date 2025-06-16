import Migration from "../../domain/Migration";
import MigrationsService from "../services/MigrationsService";

export default class GetMigrations {
  constructor(private migrationsService: MigrationsService) {}

  async execute(): Promise<Output> {
    const pendinngMigrations =
      await this.migrationsService.listPendingMigrations();
    const output: Output = {
      pendingMigrations: [],
    };
    output.pendingMigrations = pendinngMigrations.map(
      (migration: Migration) => {
        return { name: migration.name, createdAt: migration.createdAt };
      }
    );
    return output;
  }
}

type Output = {
  pendingMigrations: { name: string; createdAt: Date }[];
};
