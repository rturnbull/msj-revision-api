/*
 * (C) 2024 - present Robert Turnbull
 * SPDX-License-Identifier: N/A
 *
 */
"use strict";

import express from "express";
import cors from "cors";
import Controller from "./Controller.js";

export default class Router {
  //
  static getRouter = () => {
    const router = express.Router();
    router.post("/", [cors()], Controller.postRevision);
    router.post("/meta", [cors()], Controller.postRevisionMeta);
    return router;
  };
}
