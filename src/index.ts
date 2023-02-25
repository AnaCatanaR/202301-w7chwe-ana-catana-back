import "./loadEnviroments.js";
import createDebug from "debug";
import startServer from "./server/startServer.js";
import connectDatabase from "./database/connectDatabase.js";
import chalk from "chalk";

export const debug = createDebug("users:*");

const port = process.env.PORT ?? 4000;
const mongoDdUrl = process.env.MONGODB_CONNECTION_URL!;

try {
  await connectDatabase(mongoDdUrl!);
  debug(chalk.green("Connected to data base"));

  await startServer(+port);
  debug(chalk.green(`Server listening on port ${port}`));
} catch (error) {
  debug(error.message);
}
