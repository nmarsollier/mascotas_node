"use strict";

import * as express from "express";
import * as error from "../server/error";
import { onlyLoggedIn } from "../token/passport";
import * as user from "../user/service";
import { ISessionRequest } from "../user/service";
import * as service from "./service";

/**
 * Modulo de perfiles de usuario
 */
export function initModule(app: express.Express) {
  // Rutas del controlador
  app.route("/v1/province")
    .get(list)
    .post(onlyLoggedIn, create);

  app.route("/v1/province/:provinceId")
    .get(read)
    .delete(onlyLoggedIn, remove);
}

/**
 * @api {get} /v1/province Listar Provincias
 * @apiName Listar Provincias
 * @apiGroup Provincias
 *
 * @apiDescription Lista todas las provincias.
 *
 * @apiSuccessExample {json} Provincia
 *   [ {
 *      "name": "Nombre Provincia",
 *      "id": ""
 *     }, ...
 *   ]
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function list(req: ISessionRequest, res: express.Response) {
  const result = await service.list();

  res.json(result.map(u => {
    return {
      id: u.id,
      name: u.name
    };
  }));
}

/**
 * @api {post} /v1/province Crear Provincia
 * @apiName Crear Provincia
 * @apiGroup Provincias
 *
 * @apiDescription Crea o actualiza una provincia.
 *
 * @apiExample {json} Provincia
 *    {
 *      "name": "Nombre Provincia",
 *      "enabled": [true|false]
 *    }
 *
 * @apiSuccessExample {json} Provincia
 *    {
 *      "name": "Nombre Provincia",
 *      "enabled": [true|false]
 *    }
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function create(req: ISessionRequest, res: express.Response) {
  await user.hasPermission(req.user.user_id, "admin");
  const result = await service.create(req.body);
  res.json({ id: result });
}

/**
 * @api {post} /v1/province/:provinceId Buscar Provincia
 * @apiName Buscar Provincia
 * @apiGroup Provincias
 *
 * @apiDescription Buscar una provincia.
 *
 * @apiSuccessExample {json} Provincia
 *    {
 *      "name": "Nombre Provincia",
 *      "id": ""
 *    }
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function read(req: ISessionRequest, res: express.Response) {
  const result = await service.read(req.params.provinceId);
  return res.json({
    id: result.id,
    name: result.name
  });
}

/**
 * @api {delete} /v1/province/:provinceId Eliminar Provincia
 * @apiName Eliminar Provincia
 * @apiGroup Provincias
 *
 * @apiDescription Elimina una provincia.
 *
 * @apiUse 200OK
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function remove(req: ISessionRequest, res: express.Response) {
  await user.hasPermission(req.user.user_id, "admin");
  await service.invalidate(req.params.provinceId);
  res.send();
}
