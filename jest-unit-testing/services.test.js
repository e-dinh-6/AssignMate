import mongoose from "mongoose";
import mut from "../packages/backend/services"; //eslint-disable-line

// make sure you are running tests while connected to an empty database or tests will fail

const { ObjectId } = mongoose.Types;

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

describe("addTag function", () => {
  test("adding Tag should return back the Tag", () => {
    const tag = { name: "school" };
    return mut.addTag(tag).then((got) => {
      expect(got).toMatchObject(tag);
    });
  });
});

describe("addTask function", () => {
  test("adding Task should return back the Task", () => {
    const task = { title: "Laundry" };
    return mut.addTask(task).then((got) => {
      expect(got).toMatchObject(task);
    });
  });
});

describe("getTags function", () => {
  test("Testing getTags function w/ no tag name", () => {
    const expected = [{ name: "school" }];
    return mut.getTags().then((got) => {
      expect(got).toMatchObject(expected);
    });
  });

  test("Testing getTags function w/ tag name", () => {
    const expected = [{ name: "school" }];
    return mut.getTags("school").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
});

describe("getTask function", () => {
  test("Testing getTask function w/ no tag name", () => {
    const expected = [{ title: "Laundry" }];
    return mut.getTask().then((got) => {
      expect(got).toMatchObject(expected);
    });
  });

  test("Testing getTask function w/ tag name", () => {
    const expected = [{ title: "Laundry" }];
    return mut.getTask("Laundry").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
});

describe("addEvent function", () => {
  test("adding event should return back the event", async () => {
    const event = {
      eventName: "meeting",
      date: new Date("2024-06-05"),
      startTime: new Date("2024-06-05T12:00:00"),
      endTime: new Date("2024-06-05T13:00:00"),
      status: "in progress",
    };
    return mut.addEvent(event).then((got) => {
      expect(got).toMatchObject(event);
    });
  });
});

describe("getEvent function", () => {
  test("Testing getEvent function w/ no title", async () => {
    const expected = [{ eventName: "meeting" }];
    const result = await mut.getEvent();
    return mut.getEvent().then((got) => {
      expect(got).toMatchObject(expected);
    });
  });

  test("Testing getEvent function w/ title", () => {
    const expected = [{ eventName: "meeting" }];
    return mut.getEvent("meeting").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
});

describe("getEvents function", () => {
  test("Testing getEvents function w/ no title", async () => {
    const expected = [{ eventName: "meeting" }];
    const result = await mut.getEvents();
    console.log("result: ", result);
    return mut.getEvent().then((got) => {
      expect(got).toMatchObject(expected);
    });
  });

  // test("Testing getEvent function w/ title", () => {
  //   const expected = [{ eventName: "meeting" }];
  //   return mut.getEvent("meeting").then((got) => {
  //     expect(got).toMatchObject(expected);
  //   });
  // });
});

// describe("deleteEvent function", () => {
//   test("delete event that is in database; should return deleted user", async () => {
//     const expected = await mut.getEvent("meeting");
//     return mut.deleteEvent(expected[0]._id.toHexString()).then((got) => {
//       expect(got).toMatchObject(expected[0]);
//     });
//   });
//   test("deleteEvent w/o event id; should return null", () =>
//     mut.deleteEvent().then((got) => {
//       expect(got).toBeNull();
//     }));
// });

describe("deleteTag function", () => {
  test("delete tag that is in database; should return deleted tag", async () => {
    const expected = await mut.getTags("school");
    return mut.deleteTag("school").then((got) => {
      expect(got).toMatchObject(expected[0]);
    });
  });
  test("delete tag w/o tag name; should return null", () =>
    mut.deleteEvent().then((got) => {
      expect(got).toBeNull();
    }));
});

describe("deleteUser function", () => {
  test("delete user that is in database; should return deleted user", () => {
    const expected = mut.getUsers("joe");
    return mut.deleteUser("joe").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
  test("delete user w/o name; should return null", () =>
    mut.deleteUser().then((got) => {
      expect(got).toBeNull();
    }));
});
