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
      console.log("response", response);
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error creating the revision.");
    }
  };

  static postRevisionMeta = async (req, res) => {
    // return a metadata object:
    // {tokenCount: Number}
    // will add more if/when needed
    //
    // NOTE: COULD NOT GET THIS TO WORK. NPM LIB USES HUGGING FACE
    // BUT HF DID NOT SUPPORT THE MODEL
    // SO THIS METHOD WAS NEVER USED

    try {
      const text = req.body.text;
      const modelname = RevisionChatModel.getModelName();

      console.log("modelname", modelname);
      console.log("text", text);

      const tokenCount = await RevisionChatApiAdapter.getTokenCount(
        text,
        modelname
      );
      res.status(200).json({ tokenCount });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error fetching token count.");
    }
  };
}
