"use strict";

import * as mongoose from "mongoose";

export interface ILostPet extends mongoose.Document {
  name: string;
  missingDate: string;
  description: string;
  phoneContact: string;
  reward: string;
  user: mongoose.Schema.Types.ObjectId;
  updated: Number;
  created: Number;
  enabled: Boolean;
}

/**
 * Esquema de Mascotas Perdidas
 */
export let LostPetSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
    required: "Nombre es requerido"
  },
  missingDate: {
    type: String,
    default: "",
    trim: true
  },
  description: {
    type: String,
    default: "",
    trim: true
  },
  phoneContact: {
    type: String,
    default: "",
    trim: true
  },
  reward: {
    type: String,
    default: "",
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Usuario es requerido"
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  created: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "lost_pets" });

/**
 * Antes de guardar
 */
LostPetSchema.pre("save", function (this: ILostPet, next) {
  this.updated = Date.now();

  next();
});

export let LostPet = mongoose.model<ILostPet>("LostPet", LostPetSchema);
