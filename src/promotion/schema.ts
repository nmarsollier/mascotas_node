"use strict";

import * as mongoose from "mongoose";


export interface IPublicity extends mongoose.Document {
  title: string;
  description: string;
  redirectLink: string;
  imageId: string;
  enabled: Boolean;
}

export const PublicitySchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
    trim: true,
    required: "Nombre no puede estar vacío."
  },
  description: {
    type: String,
    default: "",
    trim: true,
    required: "La desripcion de la publicidad no puede estar vacia."
  },
  redirectLink: {
    type: String,
    default: "",
    trim: true,
    required: "Toda publicidad debe tener un link que redireccione a la publicidad."
  },
  imageId: {
    type: String,
    default: "",
    trim: true,
    required: "Toda publicidad debe tener una image que la represente."
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "publicities" });

export const Publicity = mongoose.model<IPublicity>("Publicity", PublicitySchema);
