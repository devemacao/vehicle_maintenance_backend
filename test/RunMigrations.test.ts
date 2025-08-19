test("Deve rodar e retornar a lista de migraçoes pendentes", async () => {
  const response = await fetch("http://localhost:3000/migrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect("migratedMigrations" in responseBody).toBe(true);
  expect(Array.isArray(responseBody.migratedMigrations)).toBe(true);
});
