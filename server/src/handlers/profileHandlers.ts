import { Profile, ProfileType } from "../db/model";
import { createProfile, updateProfile, profiles, deleteProfile } from "../db/controller";


export const findProfile = async (request, h) => {
    const results = await profiles(JSON.stringify(request.query.find))
    return results;
}
export const mutateProfile = async (request, h) => {
    const payload: Profile = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload
    console.log("PAYLOAD", payload, typeof payload)
    const { error, value } = ProfileType.validate(payload);
    console.log("Logging JOI results: ", value, error)
    if (error) return error
    const result = request.method === 'post' ? await createProfile(value) : request.method === 'patch' ? await updateProfile(value, value.id) : await deleteProfile(value.id)
    return result ? result.toObject() : "No data returned: Error 039";
}