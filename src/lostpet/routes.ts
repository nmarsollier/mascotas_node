"use strict";

import * as express from "express";
import * as error from "../server/error";
import { onlyLoggedIn } from "../token/passport";
import { ISessionRequest } from "../user/service";
import * as service from "./service";

/**
 * Modulo para reportar perdidas de mascotas
 */
export function initModule(app: express.Express) {
  // Rutas de acceso a mascotas
  app
    .route("/v1/lostpet")
    .get(onlyLoggedIn, findAll)
    .post(onlyLoggedIn, create);

  app
    .route("/v1/lostpet/:lostPetId")
    .delete(onlyLoggedIn, removeById);
}


async function findAll(req: ISessionRequest, res: express.Response) {
  const result = await service.findAllMissing();
  res.json(result.map(u => {
    return {
      id: u.id,
      name: u.name,
      description: u.description,
      missingDate: u.missingDate,
      phoneContact: u.phoneContact,
      reward: u.reward,
    };
  }));
}

async function create(req: ISessionRequest, res: express.Response) {
  const result = await service.update(req.user.user_id, req.body);
  res.json({
    id: result.id
  });
}

async function removeById(req: ISessionRequest, res: express.Response) {
  console.log(req)
  await service.remove(req.params.lostPetId);
  res.send();
}