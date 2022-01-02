import { backendDB } from "data/backendDB/BackendDB";

export default describe("Tests the database", () => {
  const testUserId = new Date().toISOString();

  test("Is Admin Test", async () => {
    const a = await backendDB.isUserAdmin("jorgestar29");
    expect(a).toBe(true);
    const b = await backendDB.isUserAdmin("asdfkmoiuq03u450878972jougfw");
    expect(b).toBe(false);
  });

  test("New user adds album tags", async () => {
    const res1 = await backendDB.getAllAlbumTags(testUserId);

    expect(res1[1]).toBe(null);
    expect(res1[0]).not.toBe(null);
    expect(res1[0]?.length).toBe(0);

    const res2 = await backendDB.putAlbumTags(testUserId, [
      { id: "ABC", tags: ["A", "B", "C"] },
      { id: "DEF", tags: ["D", "E", "F"] },
    ]);

    expect(res2[1]).toBe(null);
    expect(res2[0]).toBe("ok");

    // Get the album tags
    const [tagged1, err3] = await backendDB.getAllAlbumTags(testUserId);

    expect(err3).toBe(null);
    expect(tagged1).not.toBe(null);
    expect(tagged1?.length).toBe(2);

    let abc: { id: string; tags: string[] } = { id: "", tags: [] };

    for (const t of tagged1 || []) {
      if (t.id == "ABC") abc = t;
    }
    
    expect(abc.id).toBe("ABC");
    expect(abc.tags.length).toBe(3);

    expect(abc.tags).toEqual(expect.arrayContaining(["A", "B", "C"]));

    // update the tags
    const updateRes = await backendDB.putAlbumTags(testUserId, [
      { id: "ABC", tags: ["A", "D"] },
    ]);

    expect(updateRes[1]).toBe(null);
    expect(updateRes[0]).toBe("ok");

    // Get the album tags
    const [tagged2, err4] = await backendDB.getAllAlbumTags(testUserId);

    

    expect(err4).toBe(null);
    expect(tagged2).not.toBe(null);
    expect(tagged2?.length).toBe(2);

    for (const t of tagged2 || []) {
      if (t.id == "ABC") abc = t;
    }

    expect(abc.id).toBe("ABC");
    expect(abc.tags.length).toBe(2);

    expect(abc.tags).toEqual(expect.arrayContaining(["A", "D"]));
  });
});
