import { backendDB } from "data/backendDB/BackendDB";

export default describe("Tests the database", () => {
  test("Is Admin Test", async () => {
    const a = await backendDB.isUserAdmin("jorgestar29")
    expect(a).toBe(true)
    const b = await backendDB.isUserAdmin("asdfkmoiuq03u450878972jougfw")
    expect(b).toBe(false)
  });
});
