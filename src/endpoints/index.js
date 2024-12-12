/*
 * (C) 2024 - present Robert Turnbull
 * SPDX-License-Identifier: N/A
 *
 * DEFAULT ROUTER
 *
 */
"use strict";

import express from "express";
import cors from "cors";

export default class DefaultRouter {
  //
  static getDefaultRouter = () => {
    const router = express.Router();
    router.get("*", [cors()], (req, res) => {
      res
        .status(200)
        .json({
          route: req.originalUrl,
          status: 200,
          message: "OK, but not implemented",
        });
    });

    return router;
  };
}
