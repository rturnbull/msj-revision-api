/*
 * (C) 2024 - present Robert Turnbull
 * SPDX-License-Identifier: N/A
 *
 */
"use strict";

const LL_MODEL = process.env.LL_MODEL;

export default class RevisionChatModel {
  static getRevisionChatModel = (systemPrompt, userPrompt) => {
    console.log(
      "RevisionChatModel.getRevisionChatModel(systemPrompt, userPrompt)"
    );
    const model = {
      model: LL_MODEL,
      messages: [systemPrompt, userPrompt],
      stream: false,
      format: "json",
      options: {
        temperature: 0,
        num_ctx: 32000,
        keep_alive: -1,
      },
    };
    /* console.log("model\n\n", model, "\n\n"); */
    return model;
  };

  static getModelName = () => {
    return LL_MODEL;
  };
}
