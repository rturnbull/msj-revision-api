/*
 * (C) 2024 - present Robert Turnbull
 * SPDX-License-Identifier: N/A
 *
 */
"use strict";

import RevisionChatConfiguration from "./RevisionChatConfiguration.js";
import RevisionChatApiAdapter from "./RevisionChatApiAdapter.js";
import RevisionChatModel from "./RevisionChatModel.js";

export default class Controller {
  //
  static postRevision = async (req, res) => {
    try {
      // TODO: validate that we got the right values
      const { operator, operand } = req.body;

      const userPrompt = RevisionChatConfiguration.getUserPrompt(
        operator,
        operand
      );
      const systemPrompt = RevisionChatConfiguration.getSystemPrompt();
      const responseSchema = RevisionChatConfiguration.getResponseSchema();
      const model = RevisionChatModel.getRevisionChatModel(
        systemPrompt,
        userPrompt,
        responseSchema
      );

      const response = await RevisionChatApiAdapter.invokeChatApi(model);
      if (!response) throw "Revision response was null.";

      res.status(200).json(response);
    } catch (error) {
      console.log("Error was caught:", error.message);
      res.status(500).send("Error creating the revision.");
    }
  };
}
