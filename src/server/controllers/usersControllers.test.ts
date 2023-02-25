import { type Response, type Request } from "express-serve-static-core";
import User from "../../database/models/User.js";
import { getUsers } from "./usersControllers.js";
import { UserRegister } from "../types.js";

beforeEach(() => jest.restoreAllMocks());

const mockedUsers: UserRegister[] = [
  {
    name: "Andrea",
    email: "andre@yahoo.com",
    avatar: "profilepicture.jpg",
    username: "andrea18",
    password: "",
  },
  {
    name: "Kate",
    email: "kate@hello.com",
    avatar: "profilepicture.jpg",
    username: "kate20",
    password: "",
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
