import DatabaseConnection, {
  PgPromiseAdapter,
} from "./../src/DatabaseConnection";

let databaseConnection: DatabaseConnection;
beforeAll(async () => {
  databaseConnection = new PgPromiseAdapter();
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
