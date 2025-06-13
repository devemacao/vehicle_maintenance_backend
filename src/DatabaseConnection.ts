import pgp from "pg-promise";

export default interface DatabaseConnection {
  query(statement: string, params: any[]): Promise<any>;
  close(): Promise<void>;
}

export class PgPromiseAdapter implements DatabaseConnection {
  connection: any;

  constructor() {
    const connectionConfig = {
      host: process.env.POSTGRES_HOST || "",
      port: parseInt(process.env.POSTGRES_PORT || "5432"),
      database: process.env.POSTGRES_DB || "",
      user: process.env.POSTGRES_USER || "",
      password: process.env.POSTGRES_PASSWORD || "",
      max: parseInt(process.env.POSTGRES_MAX_CONNECTIONS || "10"),
    };
    this.connection = pgp({})(connectionConfig);
  }

  async query(statement: string, params: any[]): Promise<any> {
    try {
      return await this.connection.query(statement, arguments);
    } catch (error) {
      console.log(error);
    }
  }

  async close(): Promise<void> {
    return await this.connection.$pool.end();
  }
}
