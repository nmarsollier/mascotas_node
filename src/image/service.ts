"use strict";

import * as escape from "escape-html";
import * as redis from "ioredis";
import { v1 as uuid } from "uuid";
import * as appConfig from "../server/environment";
import * as error from "../server/error";
import { IImage } from "./schema";

const conf = appConfig.getConfig(process.env);
const redisClient = new redis(conf.redisPort, conf.redisHost);
redisClient.on("connect", function () {
  console.log("Redis connected");
});

interface ImageRequest {
  image: string;
}

export async function findByID(id: string): Promise<IImage> {
  try {
    const reply = await redisClient.get(escape(id));
    if (!reply) {
      throw error.ERROR_NOT_FOUND;
    }
    return Promise.resolve({
      id: escape(id),
      image: reply
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

async function validateCreate(body: ImageRequest): Promise<ImageRequest> {
  const result: error.ValidationErrorMessage = {
    messages: []
  };

  if (!body.image || body.image.length < 1) {
    result.messages.push({ path: "image", message: "Debe especificar la imagen." });
  } else if (body.image.indexOf("data:image/") < 0) {
    result.messages.push({ path: "image", message: "Imagen invalida." });
  }

  if (result.messages.length > 0) {
    return Promise.reject(result);
  }

  return Promise.resolve(body);
}

export async function create(body: ImageRequest): Promise<IImage> {
  try {
    const validBody = await validateCreate(body);
    const image: IImage = {
      id: uuid(),
      image: validBody.image
    };

    await redisClient.set(image.id, image.image);
    return Promise.resolve(image);
  } catch (err) {
    return Promise.reject(err);
  }
}
