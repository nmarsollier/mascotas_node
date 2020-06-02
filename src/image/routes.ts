"use strict";

import * as express from "express";
import * as error from "../server/error";
import { onlyLoggedIn } from "../token/passport";
import { ISessionRequest } from "../user/service";
import * as service from "./service";

/**
 * Modulo de imágenes
 */
export function initModule(app: express.Express) {
  // Rutas del controlador
  app
    .route("/v1/image")
    .post(onlyLoggedIn, create);

  app
    .route("/v1/image/:imageId")
    .get(read);
}

/**
 * @api {post} /v1/image Guardar Imagen
 * @apiName Guardar Imagen
 * @apiGroup Imagen
 *
 * @apiDescription Guarda una imagen en la db
 *
 * @apiExample {json} Body
 *    {
 *      "image" : "Base 64 Image Text"
 *    }
 *
 * @apiSuccessExample {json} Response
 *    {
 *      "id": "id de imagen"
 *    }
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function create(req: ISessionRequest, res: express.Response) {
  const result = await service.create(req.body);
  res.json({
    id: result.id
  });
}

/**
 * @api {get} /v1/image/:id Obtener Imagen
 * @apiName Obtener Imagen
 * @apiGroup Imagen
 *
 * @apiDescription Obtiene una imagen
 *
 * @apiSuccess {text} Base64 image response
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function read(req: ISessionRequest, res: express.Response) {
  const result = await service.findByID(req.params.imageId);
  const data = result.image.substring(result.image.indexOf(",") + 1);
  const buff = new Buffer(data, "base64");
  res.type("image/jpeg");
  res.send(buff);
}
