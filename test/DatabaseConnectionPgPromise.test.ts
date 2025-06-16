import DatabaseConnection from "../src/application/services/DatabseConnection";
import DatabaseConnectionPgPromise from "../src/infra/services/DatabaseConnectionPgPromise";

let databaseConnection: DatabaseConnection;
beforeAll(async () => {
  databaseConnection = new DatabaseConnectionPgPromise();
});

test("Deve conectar e verificar a versão do banco de dados local", async function () {
  const [databaseVersionResult] = await databaseConnection.query(
    "SHOW server_version;",
    []
  );
  expect(databaseVersionResult).toBeDefined();
  expect(databaseVersionResult.server_version).toEqual("16.9");
});

afterAll(async () => {
  await databaseConnection.close();
});
