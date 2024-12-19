/*
 * (C) 2024 - present Robert Turnbull
 * SPDX-License-Identifier: N/A
 *
 */
"use strict";

import { AutoTokenizer } from "@huggingface/transformers";

const OLLAMA_CHAT_API = process.env.OLLAMA_CHAT_API;

export default class RevisionChatApiAdapter {
  static invokeChatApi = async (model) => {
    try {
      const response = await fetch(OLLAMA_CHAT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      });
      const { message } = await response.json();
      return message;
    } catch (error) {
      console.log(error.message);
    }
  };

  static invokeCompletionApi = async (model) => {
    const content = await fetch(OLLAMA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    })
      .then((response) => {
        console.log(
          "HTTP response to Ollama API call",
          response.status,
          response.statusText
        );
        return response.json();
      })
      .then((data) => {
        if (data) {
          return JSON.parse(data.response);
        } else {
          console.log("Error...");
          return null;
        }
      })
      .catch((error) => {
        console.log(error.message);
        return null;
      });
    return content;
  };

  static getTokenCount = async (text, modelname) => {
    const tokenizer = await AutoTokenizer.from_pretrained(modelname);
    console.log("tokenizer", tokenizer);
    const tokens = tokenizer.tokenize(text);
    return tokens.length;
  };
}
