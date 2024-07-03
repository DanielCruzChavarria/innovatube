import { remultExpress } from "remult/remult-express";
import { Favorite } from "../dto/Favorite";
import { createPostgresDataProvider } from "remult/postgres";
import dotenv from "dotenv";
import { User } from "../dto/User";
import { UserController } from "../controller/UserController";
dotenv.config(); // Load environment variables from .env file

const DATABASE_URL = process.env["DATABASE_URL"];
export const db = remultExpress({
  entities: [Favorite, User],
  controllers: [UserController],
  getUser: (req) => req.session!["user"],
  dataProvider: DATABASE_URL
    ? createPostgresDataProvider({ connectionString: DATABASE_URL })
    : undefined,
});
