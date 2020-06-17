"use strict";
import { IPublicity, Publicity } from "./schema";
import * as error from "../server/error";

export async function list(): Promise<Array<IPublicity>> {
    try {
        const result = await Publicity.find({ enabled: true }).exec();
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function validateCreate(body: IPublicity): Promise<IPublicity> {
    const result: error.ValidationErrorMessage = {
        messages: []
    };

    if (body.title && body.title.length > 64) {
        result.messages.push({ path: "title", message: "Hasta 64 caracteres solamente." });
    }

    if (body.description && body.description.length > 1024) {
        result.messages.push({ path: "description", message: "Hasta 1024 caracteres solamente." });
    }

    if (!body.redirectLink || body.redirectLink.length <= 0) {
        result.messages.push({ path: "redirect link", message: "No puede quedar vacío." });
    }

    if (result.messages.length > 0) {
        return Promise.reject(result);
    }

    return Promise.resolve(body);
}


export async function create(body: IPublicity): Promise<string> {
    try {
        const validated = await validateCreate(body);

        const publicity = new Publicity();
        publicity.title = validated.title;
        publicity.description = validated.description;
        publicity.redirectLink = validated.redirectLink;
        publicity.imageId = validated.imageId;

        const saved = await publicity.save();
        return Promise.resolve(saved._id.toHexString());
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function read(id: string): Promise<IPublicity> {
    try {
        const result = await Publicity.findOne({
            _id: escape(id),
            enabled: true
        });
        if (!result) {
            throw error.ERROR_NOT_FOUND;
        }
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
}


export async function invalidate(id: string): Promise<void> {
    try {
        const publicity = await Publicity.findOne({
            _id: escape(id),
            enabled: true
        });
        if (!publicity) {
            throw error.ERROR_NOT_FOUND;
        }
        publicity.enabled = false;
        await publicity.save();

        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}
