test("Deve obter a lista de migrations pendentes", async function () {
  const response = await fetch("http://localhost:3000/migrations");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect("pendingMigrations" in responseBody).toBe(true);
  expect(Array.isArray(responseBody.pendingMigrations)).toBe(true);
});
