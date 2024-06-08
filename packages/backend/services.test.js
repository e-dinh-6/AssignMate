import mongoose from "mongoose";
import mut from "./services"; //eslint-disable-line
mongoose.connection.dropDatabase();

// make sure you are running tests while connected to an empty database or tests will fail

describe("getUser from empty database", () => {
  test("Testing getUser function w/ no name", () => {
    const expected = [];
    return mut.getUser().then((got) => {
      expect(got).toEqual(expected);
    });
  });
});

describe("addUser function", () => {
  test("adding user should return back the user", () => {
    const user = { username: "testUser", password: "testPassword" };
    return mut.addUser(user).then((got) => {
      expect(got).toMatchObject(user);
    });
  });
});

describe("getUser function", () => {
  test("Testing getUser function w/ no name", () => {
    const expected = [{ username: "testUser" }];
    return mut.getUser().then((got) => {
      expect(got).toMatchObject(expected);
    });
  });

  test("Testing getUser function w/ username", () => {
    const expected = [{ username: "testUser" }];
    return mut.getUser("testUser").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
});

describe("addTag function", () => {
  test("adding Tag should return back the Tag", () => {
    const tag = { username: "testUser", name: "school" };
    return mut.addTag(tag).then((got) => {
      expect(got).toMatchObject(tag);
    });
  });
});

describe("addTask function", () => {
  test("adding Task should return back the Task", () => {
    const task = { username: "testUser", title: "Laundry" };
    return mut.addTask(task).then((got) => {
      expect(got).toMatchObject(task);
    });
  });
});

describe("getTags function", () => {
  test("Testing getTags function w/ username", () => {
    const expected = [{ username: "testUser", name: "school" }];
    return mut.getTags("testUser").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
});

describe("getTasks function", () => {
  test("Testing getTasks function w/ username", () => {
    const expected = [{ username: "testUser", title: "Laundry" }];
    return mut.getTasks("testUser").then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
});

describe("addEvent function", () => {
  test("adding event should return back the event", async () => {
    const event = {
      username: "testUser",
      eventName: "meeting",
      tags: ["school", "nonExistantTag"],
      date: new Date("2024-06-05"),
      startTime: new Date("2024-06-05T12:00:00"),
      endTime: new Date("2024-06-05T13:00:00"),
      status: "in progress",
    };
    try {
      const got = await mut.addEvent(event);
      expect(got).toMatchObject({
        username: event.username,
        eventName: event.eventName,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        status: event.status,
      });
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  });
});

describe("updateEvent function", () => {
  test("updating event should return back the event", async () => {
    const expected = await mut.getEvent("testUser");
    const event = expected[0];
    const updatedEvent = {
      username: "testUser",
      eventName: "meeting2",
      tags: [],
      date: new Date("2024-06-05"),
      startTime: new Date("2024-06-05T12:00:00"),
      endTime: new Date("2024-06-05T13:00:00"),
      status: "done",
    };
    return mut
      .updateEvent(event._id.toHexString(), updatedEvent) //eslint-disable-line
      .then((got) => {
        expect(got).toMatchObject({
          username: updatedEvent.username,
          eventName: updatedEvent.eventName,
          date: updatedEvent.date,
          startTime: updatedEvent.startTime,
          endTime: updatedEvent.endTime,
          status: updatedEvent.status,
        });
      });
  });
});

describe("getEvent function", () => {
  test("Testing getEvent function w/ id", async () => {
    const expected = await mut.getEvent("testUser");
    const event = expected[0];
    return mut.getEvent("testUser", event._id.toHexString()).then((got) => { //eslint-disable-line
      expect(got).toMatchObject(expected);
    });
  });
  test("Testing getEvent function w/o id", async () => {
    const expected = {};
    return mut.getEvent("testUser", null).then((got) => {
      expect(got).toMatchObject(expected);
    });
  });
});

describe("deleteEvent function", () => {
  test("delete event that is in database; should return deleted user", async () => {
    const expected = await mut.getEvent("testUser");
    return mut.deleteEvent(expected[0]._id.toHexString()).then((got) => { //eslint-disable-line
      const event = expected[0];
      expect(got).toMatchObject({
        username: event.username,
        eventName: event.eventName,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        status: event.status,
      });
    });
  });
  test("deleteEvent w/o event id; should return null", () =>
    mut.deleteEvent().then((got) => {
      expect(got).toBeNull();
    }));
});

describe("getEvents function", () => {
  test("should return events grouped by date", async () => {
    const event = {
      _id: "6663705c47c75e5afe27e717",
      username: "anotherUser",
      date: new Date("2024-06-05T00:00:00.000Z"),
      startTime: new Date("2024-06-05T15:00:00.000Z"),
      endTime: new Date("2024-06-05T21:00:00.000Z"),
      status: "done",
      tags: [],
      eventName: "dinner",
      __v: 0,
    };
    await mut.addEvent(event);
    const result = await mut.getEvents("anotherUser");
    const resultWithoutId = {};
    Object.keys(result).forEach((dateKey) => {
      resultWithoutId[dateKey] = result[dateKey].map((event) => {
        const eventObject = event.toObject();
        const { _id, ...eventWithoutId } = eventObject;
        return { ...eventWithoutId, _id: _id.toHexString() };
      });
    });
    const expected = {
      "Tue Jun 04 2024 17:00:00 GMT-0700 (Pacific Daylight Time)": [event],
    };
    expect(expected).toMatchObject(resultWithoutId);
    await mut.deleteEvent("6663705c47c75e5afe27e717");
  });
  test("no events found", async () => {
    const result = await mut.getEvents("idontexist");
    const expected = {};
    expect(expected).toEqual(result);
  });
  test("multiple events on one date", async () => {
    const event = {
      _id: "9f7a2c8b39a014c6b9d3b6a4",
      username: "mickey",
      date: new Date("2024-06-07T00:00:00.000Z"),
      startTime: new Date("2024-06-07T15:00:00.000Z"),
      endTime: new Date("2024-06-07T21:00:00.000Z"),
      status: "later",
      tags: [],
      eventName: "concert",
      __v: 0,
    };
    const event2 = {
      _id: "3a7c8b5e9d12f4a6c6e9b7c8",
      username: "mickey",
      date: new Date("2024-06-07T00:00:00.000Z"),
      startTime: new Date("2024-06-07T19:00:00.000Z"),
      endTime: new Date("2024-06-07T22:00:00.000Z"),
      status: "later",
      tags: [],
      eventName: "office hours",
      __v: 0,
    };
    await mut.addEvent(event);
    await mut.addEvent(event2);
    const result = await mut.getEvents("mickey");
    const resultWithoutId = {};
    Object.keys(result).forEach((dateKey) => {
      resultWithoutId[dateKey] = result[dateKey].map((event) => {
        const eventObject = event.toObject();
        const { _id, ...eventWithoutId } = eventObject;
        return { ...eventWithoutId, _id: _id.toHexString() };
      });
    });
    const expected = {
      "Thu Jun 06 2024 17:00:00 GMT-0700 (Pacific Daylight Time)": [
        {
          _id: "9f7a2c8b39a014c6b9d3b6a4",
          username: "mickey",
          eventName: "concert",
          tags: [],
          date: new Date("2024-06-07T00:00:00.000Z"),
          startTime: new Date("2024-06-07T15:00:00.000Z"),
          endTime: new Date("2024-06-07T21:00:00.000Z"),
          status: "later",
          __v: 0,
        },
        {
          _id: "3a7c8b5e9d12f4a6c6e9b7c8",
          username: "mickey",
          eventName: "office hours",
          tags: [],
          date: new Date("2024-06-07T00:00:00.000Z"),
          startTime: new Date("2024-06-07T19:00:00.000Z"),
          endTime: new Date("2024-06-07T22:00:00.000Z"),
          status: "later",
          __v: 0,
        },
      ],
    };
    expect(expected).toMatchObject(resultWithoutId);
    await mut.deleteEvent("3a7c8b5e9d12f4a6c6e9b7c8");
    await mut.deleteEvent("9f7a2c8b39a014c6b9d3b6a4");
  });
});

describe("deleteTag function", () => {
  test("delete tag that is in database; should return deleted tag", async () => {
    const expected = await mut.getTag("testUser", "school", "newTag");
    return mut.deleteTag("school").then((got) => {
      expect(got).toMatchObject(expected[0]);
    });
  });
  test("delete tag w/o tag name; should return null", () =>
    mut.deleteEvent().then((got) => {
      expect(got).toBeNull();
    }));
});

describe("deleteTask function", () => {
  test("delete task that is in database; should return deleted task", async () => {
    const task = await mut.getTasks("testUser");
    mut.deleteTask(task[0]._id).then((got) => { //eslint-disable-line
      expect(got).toMatchObject(task[0]);
    });
  });
});

describe("deleteUser function", () => {
  test("delete user that is in database; should return deleted user", async () => {
    const expected = await mut.getUser("testUser");
    mut.deleteUser("testUser").then((got) => {
      expect(got).toMatchObject(expected[0]);
    });
  });
  test("delete user w/o name; should return null", () =>
    mut.deleteUser().then((got) => {
      expect(got).toBeNull();
    }));
});
