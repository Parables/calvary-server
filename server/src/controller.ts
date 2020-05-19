import mongoose = require('mongoose')
import { ProfileModel, UserModel, IProfile, IUser, Profile, User } from './model'

export default async function connectDB() {
    await mongoose.connect('mongodb+srv://db-user:R0T09yFWKAEG6qvt@cluster0-5m2qi.mongodb.net/calvaryDB?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useFindAndModify: false,
    }).then(res => {
        console.log("Connected to DB")
    });
}

export function createUser(user: User): Promise<IUser> {
    return new Promise((resolve, reject) => {
        new UserModel(user).save().then(result => {
            return resolve(result)
        }).catch(err => {
            console.log("Logging error: ", err)
            return reject(err)
        })
    })
}

export function updateUser(user: User, id: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
        UserModel.findByIdAndUpdate(id, { $set: user }, { new: true }).then(result => {
            return resolve(result)
        }).catch(err => {
            return reject(err)
        })
    })
}

export function deleteUser(id: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
        UserModel.findByIdAndDelete(id).then(result => {
            return resolve(result)
        }).catch(err => {
            return reject(err)
        })
    })
}
export function user(user: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
        return UserModel.findOne({ $or: [{ username: user }, { email: user }] }).then(result => {
            console.log("Res", result)
            return resolve(result.toObject())
        }).catch(err => {
            console.log(err)
            return reject(err)
        })
    })
}


export function createProfile(profile: Profile): Promise<IProfile> {
    return new Promise((resolve, reject) => {
        new ProfileModel(profile).save().then(result => {
            return resolve(result)
        }).catch(err => {
            console.log("Logging error: ", err)
            return reject(err)
        })
    })
}


export function updateProfile(profile: Profile, id: string): Promise<IProfile> {
    return new Promise((resolve, reject) => {
        ProfileModel.findByIdAndUpdate(id, { $set: profile }, { new: true }).then(result => {
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