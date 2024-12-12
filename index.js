/*
 * (C) 2024 Robert Turnbull
 * SPDX-License-Identifier: N/A
 */
"use strict";

import {} from "dotenv/config";
import { Application } from "./src/classes/Application.js";

// start the app
const app = Application.getApp();
const PORT = process.env.APP_PORT || 2468
app.listen(PORT, () => {
  console.log(
    `${process.env.APP_NAME} ${process.env.APP_VERSION} is listening on port ${PORT}`
  );
  
});