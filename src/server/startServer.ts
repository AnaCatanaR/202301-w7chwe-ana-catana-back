import createDebug from "debug";
import chalk from "chalk";
import app from "./index.js";
import type CustomError from "./CustomError/CustomError.js";

const debug = createDebug("server");

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.bgGreen(`Start with server 'http://localhost:${port}'`));
      resolve(server);
    });

    server.on("error", (error: CustomError) => {
      const errorMessage = "Error on starting the server";

      if (error.code === "EADDRINUSE") {
        debug(errorMessage, `The port number ${port} is already in use`);
      }

      reject(new Error(errorMessage));
    });
  });

export default startServer;
