import "dotenv/config";

import express from "express";

import * as Sentry from "@sentry/node";

import Youch from "youch";
import "express-async-errors";

import routes from "./routes";

import sentryConfig from "./config/sentry";

// Middleware global
// import authMiddleware from "./app/middlewares/auth";

import "./database";

class App {
  constructor() {
    this.server = express();

    Sentry.init({
      ...sentryConfig,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
      ],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    // this.server.use(authMiddleware);
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  // Manipulador de exceção
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: "Internal server error." });
    });
  }
}

export default new App().server;
