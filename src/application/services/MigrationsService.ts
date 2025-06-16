import Migration from "../../domain/Migration";

export default interface MigrationsService {
  listPendingMigrations(): Promise<Migration[]>;
}
