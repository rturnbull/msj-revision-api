/*
 * (C) 2024 - present Robert Turnbull
 * SPDX-License-Identifier: N/A
 */
"use strict";
import {} from "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import revisionRouter from "../endpoints/revision/Router.js";

// routers
import DefaultRouter from "../../src/endpoints/index.js";

//const APP_URL = process.env.APP_URL;
const REVISION_URL = process.env.APP_URL + "/revision";

export class Application {
  static getApp = () => {
    const app = express();

    app.use(
      cors({
        origin: [
          "https://mainstreetjournal.app",
          "https://cms.mainstreetjournal.app",
          "http://localhost:3000",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );
    app.use(morgan("combined"));
    app.use(express.json());

    app.use(REVISION_URL, revisionRouter.getRouter());
    app.use("*", DefaultRouter.getDefaultRouter());

    return app;
  };
}
