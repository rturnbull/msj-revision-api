/*
 * (C) 2024 - present Robert Turnbull
 * SPDX-License-Identifier: N/A
 *
 */
"use strict";

export default class RevisionChatModel {
  static getRevisionChatModel =  (
    systemPrompt,
    userPrompt,
    responseSchema
  ) => {
    const model = {
      model: "llama3.1:8b-instruct-fp16",
      messages: [systemPrompt, userPrompt],
      stream: false,
      format: "json",
      options: {
        temperature: 0,
      },
    };
    console.log("model\n\n", model, "\n\n")
    return model;
  };
}
