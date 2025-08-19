import { Request, Response, Router } from "express";
import GetMigrations from "../../application/usecases/GetMigrations";
import RunMigrations from "../../application/usecases/RunMigrations";

export default class MigrationsController {
  readonly router: Router;

  constructor(
    private getMigrations: GetMigrations,
    private runMigrations: RunMigrations
  ) {
    this.router = Router();
    this.router.get("/", this.getMigrationsHandler);
    this.router.post("/", this.postMigrationsHandler);
  }

  private getMigrationsHandler = async (req: Request, res: Response) => {
    const pendingMigrations = await this.getMigrations.execute();
    console.log(pendingMigrations);
    res.status(200).json(pendingMigrations);
  };

  private postMigrationsHandler = async (req: Request, res: Response) => {
    const migratedMigrations = await this.runMigrations.execute();
    console.log(migratedMigrations);
    res.status(200).json(migratedMigrations);
  };
}
