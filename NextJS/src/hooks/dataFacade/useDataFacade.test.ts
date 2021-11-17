import { CacheDb } from "data/cacheDB/CacheDB";
import { renderHook } from "@testing-library/react-hooks";
import { useClientsStore } from "store/useClients";
export default describe("data facade hook test", () => {
  const { result } = renderHook(() => useClientsStore());
  const client = result.current;

  beforeAll(() => {});
  test("getAlbum", async () => {});
});
