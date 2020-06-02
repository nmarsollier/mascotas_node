"use strict";

import * as express from "express";
import { NextFunction } from "express-serve-static-core";
import * as mongoose from "mongoose";

export const ERROR_UNAUTHORIZED = 401;
export const ERROR_INVALID_CREDENTIALS = 403;
export const ERROR_NOT_FOUND = 404;
export const ERROR_BAD_REQUEST = 400;
export const ERROR_INTERNAL_ERROR = 500;

export class ValidationErrorItem {
  path: string;
  message: string;
}
export class ValidationErrorMessage {
  code?: number;
  error?: string;
  messages?: ValidationErrorItem[];
}

export function newArgumentError(argument: string, err: string): ValidationErrorMessage {
  const result = new ValidationErrorMessage();
  result.messages = [{
    path: argument,
    message: err
  }];
  return result;
}

export function newError(code: number, err: string): ValidationErrorMessage {
  const result = new ValidationErrorMessage();
  result.code = code;
  result.error = err;
  return result;
}

/**
 * @apiDefine 200OK
 *
 * @apiSuccessExample {json} Response
 *     HTTP/1.1 200 OK
 */
/**
 * @apiDefine ParamValidationErrors
 *
 * @apiErrorExample 400 Bad Request
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "messages" : [
 *          {
 *            "path" : "{Nombre de la propiedad}",
 *            "message" : "{Motivo del error}"
 *          },
 *          ...
 *       ]
 *     }
 */

/**
 * @apiDefine OtherErrors
 *
 * @apiErrorExample 500 Server Error
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *        "error" : "Not Found"
 *     }
 *
 */
export function handle(err: any, req: express.Request, res: express.Response, next: NextFunction) {
  if (err instanceof ValidationErrorMessage
    || err.code || err.messages) {
    // ValidationErrorMessage
    if (err.code) {
      res.status(err.code);
    } else {
      res.status(400);
    }
    const send: any = {};
    if (err.error) {
      send.error = err.error;
    }
    if (err.messages) {
      send.messages = err.messages;
    }

    return res.send(send);
  } else if (err instanceof mongoose.Error.ValidationError) {
    // Error de Mongo
    return res.send(sendMongooseValidationError(res, err));
  } else if (err.code) {
    // Error de Mongo
    return res.send(sendMongoose(res, err));
  } else {
    console.log(err);
    return res.send(sendUnknown(res, err));
  }
}

export function handle404(req: express.Request, res: express.Response) {
  res.status(ERROR_NOT_FOUND);
  res.send({
    url: req.originalUrl,
    error: "Not Found"
  });
}

// Error desconocido
function sendUnknown(res: express.Response, err: any): ValidationErrorMessage {
  res.status(ERROR_INTERNAL_ERROR);
  return { error: err };
}

// Obtiene un error adecuando cuando hay errores de db
function sendMongooseValidationError(res: express.Response, err: mongoose.Error.ValidationError): ValidationErrorMessage {
  res.status(ERROR_BAD_REQUEST);
  const result = new ValidationErrorMessage();
  result.messages = [];

  Object.keys(err.errors).forEach(property => {
    const element = err.errors[property];
    if (element.path && element.message) {
      result.messages.push({
        path: element.path as string,
        message: element.message as string,
      });
    }
  });

  if (result.messages.length == 0 && err.message) {
    result.error = err.message;
  }

  return result;
}

// Obtiene un error adecuando cuando hay errores de db
function sendMongoose(res: express.Response, err: any): ValidationErrorMessage {
  res.status(ERROR_BAD_REQUEST);

  try {
    switch (err.code) {
      case 11000:
      case 11001:
        const fieldName = err.errmsg.substring(
          err.errmsg.lastIndexOf("index:") + 7,
          err.errmsg.lastIndexOf("_1")
        );
        return {
          messages: [{
            path: fieldName,
            message: "Este registro ya existe."
          }]
        };
      default:
        res.status(ERROR_BAD_REQUEST);
        return { error: err };
    }
  } catch (ex) {
    res.status(ERROR_INTERNAL_ERROR);
    return { error: err };
  }
}
