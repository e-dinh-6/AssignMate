// services.test.js
import { jest } from "@jest/globals";
import { MongoKerberosError } from "mongodb";
import mut from "../packages/backend/services.js";

describe("getUser from empty database", () => {
  test("Testing getUser function w/ no name", async () => {
    const expected = [];
    const got = await mut.getUsers();
    return expect(got).toEqual(expected);
  });
});

describe("addUser function", () => {
  test("adding user should return back the user", () => {
    const user = { username: "joe", password: "hijoe" };
    return mut.addUser(user).then((got) => {
      expect(got).toMatchObject(user);
    });
  });
});

describe("getUser function", () => {
  test("Testing getUser function w/ no name", async () => {
    const expected = [{ username: "joe" }];
    return mut.getUsers().then((got) => {
      expect(got).toMatchObject(expected);
    });
  });

  test("Testing getUser function w/ username", () => {
    const expected = [{ username: "joe" }];
    return mut.getUsers("joe").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
});

describe("findUserByName function", () => {
  test("Testing findUserByName function w/ no name", async () => {
    const expected = [{ username: "joe" }];
    return mut.findUserByName("joe").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });

  test("Testing findUserByName function w/ username", () => {
    const expected = [{ username: "joe" }];
    return mut.findUserByName("joe").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
});

describe("findUserByUsernameAndPassword function", () => {
  test("Testing findUserByUserameAndPassword function w/ no name", async () => {
    const expected = [{ username: "joe", password: "hijoe" }];
    return mut.findUserByUsernameAndPassword("joe", "hijoe").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });

  test("Testing findUserByUsernameAndPassword function w/ username", () => {
    const expected = [{ username: "joe", password: "hijoe" }];
    return mut.findUserByUsernameAndPassword("joe", "hijoe").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
});

// describe("addEvent function", () => {
//   test("adding event should return back the event", () => {
//     const event = {
//       eventName: "meeting1",
//       date: new Date("2024-06-01"),
//       startTime: new Date("2024-06-01T09:00:00"),
//       endTime: new Date("2024-06-01T10:00:00"),
//       status: "in progress",
//     };
//     return mut.addEvent(event).then((got) => {
//       expect(got).toMatchObject(event);
//     });
//   });
// });

describe("getEvent function", () => {
  test("Testing getEvent function w/ no title", async () => {
    const expected = [{ eventName: "meeting" }];
    return mut.getEvent().then((got) => {
      expect(got).toMatchObject(expected);
    });
  });

  test("Testing getEvent function w/ title", () => {
    const expected = [{ eventName: "meeting" }];
    return mut.getUsers("meeting").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
});

describe("deleteEvent function", () => {
  test("delete event that is in database; should return deleted user", () => {
    const expected = mut.getEvent("meeting");
    return mut.deleteEvent("665a15f8962813183d122c80").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
  // test("delete user that isn't in database; should return null", () =>
  //   mut.deleteUser("sergio").then((got) => {
  //     expect(got).toBeNull();
  //   }));
});

describe("deleteUser function", () => {
  test("delete user that is in database; should return deleted user", () => {
    const expected = mut.getUsers("joe");
    return mut.deleteUser("joe").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
  test("delete user that isn't in database; should return null", () =>
    mut.deleteUser("sergio").then((got) => {
      expect(got).toBeNull();
    }));
});

// describe("getTags function", () => {
//   test("Testing getTags w/ no name", () => {
//     jest.spyOn(mut, "find").mockResolvedValue([]);
//     const expected = [];
//     return mut.getTags().then((got) => {
//       expect(got).toEqual(expected);
//     });
//   });

//   test("Testing getUser function w/ name", () => {
//     jest.spyOn(mut, "find").mockResolvedValue([{ name: "School" }]);
//     const expected = [{ name: "School" }];
//     return mut.getTags("School").then((got) => {
//       expect(got).toEqual(expected);
//     });
//   });
// });

// describe("getEvent function", () => {
//   test("Testing getEvent w/ no title", () => {
//     jest.spyOn(mut, "find").mockResolvedValue([]);
//     const expected = [];
//     return mut.getEvent().then((got) => {
//       expect(got).toEqual(expected);
//     });
//   });

//   test("Testing getUser function w/ title", () => {
//     jest.spyOn(mut, "find").mockResolvedValue([{ title: "Meeting" }]);
//     const expected = [{ title: "Meeting" }];
//     return mut.getEvent("Meeting").then((got) => {
//       expect(got).toEqual(expected);
//     });
//   });
// });
