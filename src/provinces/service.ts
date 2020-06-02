"use strict";
import { IProvince, Province } from "./schema";
import * as error from "../server/error";

export async function list(): Promise<Array<IProvince>> {
    try {
        const result = await Province.find({ enabled: true }).exec();
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function validateCreate(body: IProvince): Promise<IProvince> {
    const result: error.ValidationErrorMessage = {
        messages: []
    };

    if (!body.name || body.name.length <= 0) {
        result.messages.push({ path: "name", message: "No puede quedar vacío." });
    } else if (body.name.length > 256) {
        result.messages.push({ path: "name", message: "Hasta 256 caracteres solamente." });
    }

    if (result.messages.length > 0) {
        return Promise.reject(result);
    }

    return Promise.resolve(body);
}


export async function create(body: IProvince): Promise<string> {
    try {
        const validated = await validateCreate(body);

        const province = new Province();
        province.name = validated.name;

        const saved = await province.save();
        return Promise.resolve(saved._id.toHexString());
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function read(id: string): Promise<IProvince> {
    try {
        const result = await Province.findOne({
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
        const province = await Province.findOne({
            _id: escape(id),
            enabled: true
        });
        if (!province) {
            throw error.ERROR_NOT_FOUND;
        }
        province.enabled = false;
        await province.save();

        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}
