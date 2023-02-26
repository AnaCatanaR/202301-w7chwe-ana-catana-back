import { type Response, type Request } from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import app from "../index.js";
import User from "../../database/models/User.js";
import { getUsers } from "./usersControllers.js";
import { UserRegister } from "../types.js";
import connectDatabase from "../../database/connectDatabase.js";

beforeEach(() => jest.restoreAllMocks());

const mockedUsers: UserRegister[] = [
  {
    name: "Andrea",
    email: "andre@yahoo.com",
    avatar: "profilepicture.jpg",
    username: "andrea18",
    password: "12345678",
  },
  {
    name: "Kate",
    email: "kate@hello.com",
    avatar: "profilepicture.jpg",
    username: "kate20",
    password: "12345678",
  },
];

describe("Given the getUsers controller middleware", () => {
  describe("When it receives a request from an user", () => {
    test("Then it should call its status method with 200 code", async () => {
      const response = {
        status: jest.fn().mockReturnThis(),

        json: jest.fn().mockResolvedValue(mockedUsers),
      } as Partial<Response>;

      const request = {};

      const next = jest.fn();

      const expectedStatusCode = 200;

      User.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockedUsers),
      }));

      await getUsers(request as Request, response as Response, next);

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const response = {
        status: jest.fn().mockReturnThis(),

        json: jest.fn().mockResolvedValue(mockedUsers),
      } as Partial<Response>;

      const request = {};

      const next = jest.fn();

      User.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockedUsers),
      }));

      await getUsers(request as Request, response as Response, next);

      expect(response.json).toHaveBeenCalledWith({ users: mockedUsers });
    });
  });
});

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

describe("Given a POTS 'user/register' endpoint", () => {
  describe("When it receives a request with username 'andrea18' and password '12345678'", () => {
    test("Then it should repond with status code '201' and message 'You have created an account for Alina .The username and password have been sent to the e-mail address alin@yah.com.'", async () => {
      const expectedStatusCode = 201;
      const expectedResponse = `You have created an account for ${mockedUsers[0].name} .The username and password have been sent to the e-mail address ${mockedUsers[0].email}.`;

      const contentHead = { "Content-Type": "multipart/form-data" };
      const userRegisterEndpoint = "/users/register";

      const response = await request(app)
        .post(userRegisterEndpoint)
        .set(contentHead)
        .field("name", mockedUsers[0].name)
        .field("email", mockedUsers[0].email)
        .field("username", mockedUsers[0].username)
        .field("password", mockedUsers[0].password)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual(expectedResponse);
    });
  });
});
