import { model, Schema, Document, Model } from 'mongoose';
import Joi = require('@hapi/joi')

const ProfileSchema = new Schema({
    name: { type: String, default: '', required: true },
    phoneNumber: { type: String, default: "", required: false },
    dob: { type: Date, default: '', required: false },
    nationality: { type: String, default: '', required: false },
    gender: { type: String, default: '', required: false },
    postalAddress: { type: String, default: '', required: false },
    branch: { type: String, default: '', required: false },
    houseAddress: { type: String, default: '', required: false },
    childCount: { type: Number, default: 0, required: false },
    maritalStatus: { type: String, default: '', required: false }
})

export const ProfileType = Joi.object({
    id: Joi.string().alphanum(),
    name: Joi.string().min(3).max(30),
    phoneNumber: Joi.string().max(10).default(""),
    dob: Joi.date().min("01/01/1900").max("now"),
    nationality: Joi.string(),
    gender: Joi.string(),
    postalAddress: Joi.string(),
    branch: Joi.string(),
    houseAddress: Joi.string(),
    childCount: Joi.number().integer().min(0).max(50),
    maritalStatus: Joi.string(),
}).or('name', 'id')

export interface Profile {
    name: string
    phoneNumber: string
    dob: string
    nationality: string
    gender: string
    postalAddress: string
    branch: string
    houseAddress: string
    childCount: number
    maritalStatus: string
}
export interface IProfile extends Profile, Document { }
export const ProfileModel: Model<IProfile> = model<IProfile>("Profile", ProfileSchema)