import { User, UserType } from "../db/model";
import { createUser, updateUser } from "../db/controller";
const bcrypt = require('bcrypt');

export const mutateUser = async (request, h) => {
    const payload: User = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload
    console.log("PAYLOAD", payload, typeof payload)
    let { error, value } = UserType.validate(payload);
    console.log("Logging JOI results: ", value, error)
    if (error) return error
    bcrypt.hash(value.password, 10).then(async function (hash) {
        value.password = hash
        console.log("Hashing", value.password, hash)
        const result = request.method === 'post' ? await createUser(value) : await updateUser(value, value.id)
        return result ? result.toObject() : "No data returned: Error 039";
    });
}