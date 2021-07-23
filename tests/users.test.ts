import { Connection } from "mongoose";
const mongoose = require("mongoose");
const mongoConnection = `mongodb+srv://admin:test123@cluster0.puyqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const Users = require("../models/Users");
const mockUser = {
  email: "test@test.com",
  password: "test123",
};

describe("User model test", () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await mongoose.connect(mongoConnection, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  });

  it("create & save user successfully", async () => {
    // making sure the test user is not in the database
    await Users.deleteOne({ email: "test@test.com" });
    const validUser = new Users(mockUser);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(mockUser.email);
    // user has user rights by default
    expect(savedUser.role).toBe("user");
  });

  it("user must have an email error", async () => {
    const mock = {
      email: undefined,
      password: "test123",
    };
    let error = null;
    try {
      const validUser = new Users(mock);
      await validUser.save();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });

  it("invalid email validation error", async () => {
    // deleting the test user so the test can be rerun
    const mock = {
      email: "undefined.com",
      password: "test123",
    };
    let error = null;
    try {
      const validUser = new Users(mock);
      await validUser.save();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });

  it("password too short error", async () => {
    // deleting the test user so the test can be rerun
    const mock = {
      email: "test_short_password@test.com",
      password: "test",
    };
    let error = null;
    try {
      const validUser = new Users(mock);
      await validUser.save();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });

  it("user already created error", async () => {
    let error = null;
    try {
      const validUser = new Users(mockUser);
      await validUser.save();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });

  it("updates user successfully", async () => {
    const expectedUser = {
      images: ["https://i.imgur.com/UTMTuRO.jpeg"],
    };
    let updatedUser = await Users.findOneAndUpdate(
      { email: mockUser.email },
      {
        $push: {
          images: "https://i.imgur.com/UTMTuRO.jpeg",
        },
      },
      { new: true, upsert: true }
    ).lean(); // .lean() returns js arrays, not mongoose arrays
    expect(updatedUser.images).toStrictEqual(expectedUser.images);

    // we delete the added image afterwards so we keep the mock user clean
    updatedUser = await Users.findOneAndUpdate(
      { email: mockUser.email },
      {
        $pull: {
          images: "https://i.imgur.com/UTMTuRO.jpeg",
        },
      },
      { new: true, upsert: true }
    ).lean();
    expect(updatedUser.images).toStrictEqual(["something"]);
  });
});
