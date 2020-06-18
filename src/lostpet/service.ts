"use strict";

import * as error from "../server/error";
import { ILostPet, LostPet } from "./schema";
const mongoose = require("mongoose");

export async function findAllMissing(): Promise<Array<ILostPet>> {
  try {
    const result = await LostPet.find({
      enabled: true
    }).exec();
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function validateUpdate(body: ILostPet): Promise<ILostPet> {
  const result: error.ValidationErrorMessage = {
    messages: []
  };

  if (body.name && body.name.length > 256) {
    result.messages.push({ path: "name", message: "Hasta 256 caracteres solamente." });
  }

  if (body.description && body.description.length > 1024) {
    result.messages.push({ path: "description", message: "Hasta 1024 caracteres solamente." });
  }

  var isNumber = /^\d+\.\d+$/.test(body.phoneContact);
  if (isNumber){
    result.messages.push({ path: "phoneContact", message: "No puede contener letras." });
  }

  if (result.messages.length > 0) {
    return Promise.reject(result);
  }

  return Promise.resolve(body);
}

export async function update(userId: string, body: ILostPet): Promise<ILostPet> {
  try {
    let current: ILostPet;
  
    current = new LostPet();
    current.user = mongoose.Types.ObjectId.createFromHexString(userId);
    
    const validBody = await validateUpdate(body);
    if (validBody.name) {
      current.name = validBody.name;
    }
    if (validBody.description) {
      current.description = validBody.description;
    }
    
    if (validBody.reward) {
      current.reward = validBody.reward;
    }

    current.missingDate = body.missingDate;

    if (validBody.phoneContact) {
      current.phoneContact = validBody.phoneContact;
    }

    console.log(current)

    await current.save();
    return Promise.resolve(current);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function remove(petId: string): Promise<void> {
  try {

    const pet = await LostPet.findOne({
      _id: petId,
      enabled: true
    }).exec();
    console.log(pet)
    if (!pet) {
      console.log("ERROR")
      throw error.ERROR_NOT_FOUND;
    }
    pet.enabled = false;
    await pet.save();
  } catch (err) {
    return Promise.reject(err);
  }
}
