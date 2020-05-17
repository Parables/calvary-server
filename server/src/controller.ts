import mongoose = require('mongoose')
import { ProfileModel, IProfile, Profile } from './model'

export default async function connectDB() {
    await mongoose.connect('mongodb+srv://db-user:R0T09yFWKAEG6qvt@cluster0-5m2qi.mongodb.net/calvaryDB?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useFindAndModify: false,
    }).then(res => {
        console.log("Connected to DB")
    });
}

export function createProfile(profile: Profile): Promise<IProfile> {
    return new Promise((resolve, reject) => {
        console.log("Logging data: ", profile)
        return new ProfileModel(profile).save().then(result => {
            return resolve(result)
        }).catch(err => {
            console.log("Logging error: ", err)
            return reject(err)
        })
    })
}


export function updateProfile(profile: Profile, id: string): Promise<IProfile> {
    return new Promise((resolve, reject) => {
        console.log(profile)
        ProfileModel.findByIdAndUpdate(id, { $set: profile }, { new: true }).then(result => {
            console.log("Res: ", JSON.stringify(result, null, 2))
            return resolve(result)
        }).catch(err => {
            return reject(err)
        })
    })
}

export function deleteProfile(id: string): Promise<IProfile> {
    return new Promise((resolve, reject) => {
        ProfileModel.findByIdAndDelete(id).then(result => {
            return resolve(result)
        }).catch(err => {
            return reject(err)
        })
    })
}

export function allProfiles(): Promise<IProfile[]> {
    return new Promise((resolve, reject) => {
        ProfileModel.find().sort({ name: 1 }).then(result => {
            return resolve(result)
        }).catch(err => {
            return reject(err)
        })
    })
}

export function profile(id: string): Promise<IProfile[]> {
    return new Promise((resolve, reject) => {
        ProfileModel.find({ _id: id }).sort({ name: 1 }).then(result => {
            return resolve(result)
        }).catch(err => {
            return reject(err)
        })
    })
}

export function search(search: string): Promise<IProfile[]> {
    return new Promise((resolve, reject) => {
        ProfileModel.find({ name: { $regex: ".*" + search + ".*", $options: "i" } }).sort({ name: 1 }).then(result => {
            return resolve(result)
        }).catch(err => {
            return reject(err)
        })
    })
}