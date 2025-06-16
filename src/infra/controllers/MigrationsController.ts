import { Request, Response, Router } from "express";
import GetMigrations from "../../application/usecases/GetMigrations";

export default class MigrationsController {
  readonly router: Router;

  constructor(private getMigrations: GetMigrations) {
    this.router = Router();
    this.router.get("/", this.getMigrationsHandler);
  }

  private getMigrationsHandler = async (req: Request, res: Response) => {
    const pendingMigrations = await this.getMigrations.execute();
    console.log(pendingMigrations);
    res.status(200).json(pendingMigrations);
  };
}
