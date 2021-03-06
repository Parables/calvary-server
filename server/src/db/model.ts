import { model, Schema, Document, Model } from 'mongoose';
import Joi = require('@hapi/joi')

const UserSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: false }
})

export const UserType = Joi.object({
    id: Joi.string().alphanum(),
    username: Joi.string().min(3).max(30).allow(''),
    password: Joi.string().min(4).required().allow(''),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).allow('')
}).or('username', 'email', 'id')

export interface User {
    username?: string
    email?: string
    password: string
}
export interface IUser extends User, Document { }
export const UserModel: Model<IUser> = model<IUser>('User', UserSchema)

const ProfileSchema = new Schema({
    name: { type: String, default: '', required: true },
    phoneNumber: { type: String, default: '', required: false },
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
    phoneNumber: Joi.string().empty('').default('').allow(''),
    dob: Joi.date().min("01/01/1900").max("now").empty(null).default('').allow(''),
    nationality: Joi.string().empty('').default('').allow(''),
    gender: Joi.string().empty('').default('').allow(''),
    postalAddress: Joi.string().empty('').default('').allow(''),
    branch: Joi.string().empty('').default('').allow(''),
    houseAddress: Joi.string().empty('').default('').allow(''),
    childCount: Joi.number().integer().min(0).max(50).default(0),
    maritalStatus: Joi.string().empty('').default('').allow(''),
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