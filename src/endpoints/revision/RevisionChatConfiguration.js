/*
 * (C) 2024 - present Robert Turnbull
 * SPDX-License-Identifier: N/A
 *
 */
"use strict";

export default class RevisionChatConfiguration {
  static getSystemPrompt = () => {
    return {
      role: "system",
      content: `
You are a senior newspaper editor at a community newspaper. Your job is to rewrite texts that other less experienced reporters submit, turning them into professional news reports. You MUST  unconditionally adhere to these principles: 
All your completed reports MUST have a title, a lede, and a body.
You MUST respond using markdown.
You MUST use the JSON format provided.
<json>
{
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
        },
        "lede": {
         " type": "string",
        },
        "body": {
          "type": "string",
        },
      },
      "required": ["title", "lede", "body"],
    }
</json>

`,
    };
  };

  static getResponseSchema = () => {
    return JSON.stringify({
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        lede: {
          type: "string",
        },
        body: {
          type: "string",
        },
      },
      required: ["title", "lede", "body"],
    });
  };

  static getUserPrompt = (prompt, text) => {
    return { role: "user", content: ` ${prompt} <text>${text}</text>` };
  };
}
