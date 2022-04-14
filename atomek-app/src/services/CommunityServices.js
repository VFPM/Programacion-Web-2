import { axiosBase as axios } from "./Config";

export const CommunityCreate = async (req) => {
    try {
        const response = await axios.post(`/community`, req);
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const communityAddUser = async (req) => {
    try {
        const response = await axios.put(`/community/${req.communityId}/add-user`, req);
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const communityGetComunitiesByUser = async (req) => {
    try {
        const response = await axios.get(`/users/${req._id}/communities`);
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}