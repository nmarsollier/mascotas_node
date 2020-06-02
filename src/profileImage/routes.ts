"use strict";

import * as express from "express";
import * as imageService from "../image/service";
import * as profileService from "../profile/service";
import * as error from "../server/error";
import { onlyLoggedIn } from "../token/passport";
import { ISessionRequest } from "../user/service";

/**
 * Modulo de imágenes de perfil
 */
export function initModule(app: express.Express) {
  // Rutas del controlador
  app
    .route("/v1/profile/picture")
    .post(onlyLoggedIn, updateProfilePicture);

}

/**
 * @api {post} /v1/profile/picture Guardar Imagen de Perfil
 * @apiName Guardar Imagen de Perfil
 * @apiGroup Perfil
 *
 * @apiDescription Guarda una imagen de perfil en la db y actualiza el perfil
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
async function updateProfilePicture(req: ISessionRequest, res: express.Response) {
  const imageResult = await imageService.create(req.body);
  const profileResult = await profileService.updateProfilePicture(req.user.user_id, imageResult.id);

  res.json({
    id: profileResult.picture
  });
}

