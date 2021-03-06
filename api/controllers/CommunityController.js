const { default: mongoose } = require("mongoose");
const Community = require("../models/CommunitySchema");
const ImageUploader = require("../utils/ImageUploader");
const verifyToken = require("../utils/TokenVerify");

exports.communityGetById = async (req, res) => {
    const { id } = req.params;
    const auth = req.get('authorization');

    if (!verifyToken(auth)) {
        res.status(401).send({message: "Token invalid"});
        return;
    }

    try {
        const community = await Community.findById(id).populate("_category").populate("_users");
        if (community) {
            res.send(community);
        }
        else {
            res.status(404).send({message: "Community not found"});
        }
    }
    catch(err) {
        res.status(404).send({message: "Community not found"});
    }
};

exports.communityCreate = async (req, res) => {
    const { body } = req;
    const auth = req.get('authorization');

    if (!verifyToken(auth)) {
        res.status(401).send({message: "Token invalid"});
        return;
    }
    
    const community = new Community(body);

    await community
    .save()
    .then(() => {
        res.send(community);
        console.log("Succesful community creation");
    })
    .catch((err) => {
        console.log("Could not create a community", err);
        res.status(500).send({message: "Could not create a community", err});
    });
}

exports.communityUpdate = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const auth = req.get('authorization');

    if (!verifyToken(auth)) {
        res.status(401).send({message: "Token invalid"});
        return;
    }
    
    const community = await Community.findById(id);

    if (community) {
        await community.updateOne(body)
        res.send();
    }
    else {
        res.status(404).send({message: "Community not found. Could not update data"});
    }
};

exports.communityUpdateImage = async (req, res) => {
    const { id } = req.params;
    const { body, headers } = req;
    const auth = req.get('authorization');

    if (!req.is("image/*")) {
        return res.status(415).send({message: "Unsupported media type. Should be an image file"});
    }

    const community = await Community.findById(id);

    if (!community) {
        return res.status(404).send({message: "Community not found. Could not update data"});
    }

    const imageUploader = new ImageUploader();

    const imageUrl = await imageUploader.upload(body, headers["content-type"]);

    if (imageUrl) {
        await community.updateOne({image: imageUrl});
        res.send();
    }
    else {
        res.status(500).send({message: "Image could not be uploaded"});
    }
};

exports.communityDelete = async (req, res) => {
    const { id } = req.params;
    const auth = req.get('authorization');

    if (!verifyToken(auth)) {
        res.status(401).send({message: "Token invalid"});
        return;
    }
    
    const community = await Community.findById(id);

    if (community) {
        await community.deleteOne();
        res.send();
    }
    else {
        res.status(404).send({message: "Community not found. Could not delete data"});
    }
};

exports.communityGetAmountOfUsers = async (req, res) => {
    var { id } = req.params;
    const auth = req.get('authorization');

    if (!verifyToken(auth)) {
        res.status(401).send({message: "Token invalid"});
        return;
    }
    
    id = mongoose.Types.ObjectId(id);
    const community = await Community
        .aggregate([
            { $match: { _id: id } },
            { $project: { amount_users: { $size: "$_users" } } }
        ]);

    if (community) {
        res.send(community[0]);
    }
    else {
        res.status(404).send({message: "Community not found"});
    }
};

exports.communityAddUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const auth = req.get('authorization');

    if (!verifyToken(auth)) {
        res.status(401).send({message: "Token invalid"});
        return;
    }
    
    const community = await Community.findById(id);

    if (community) {
        await community.updateOne(
            { 
                $addToSet: { 
                    _users: body.id
                } 
            }
        );
        res.send(community);
    }
    else {
        res.status(404).send({message: "Community not found. Could not update data"});
    }
};

exports.communityAddCategory = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const auth = req.get('authorization');

    if (!verifyToken(auth)) {
        res.status(401).send({message: "Token invalid"});
        return;
    }
    
    const community = await Community.findById(id);

    if (community) {
        await community.updateOne(
            { 
                $addToSet: { 
                    _category: body.id
                } 
            }
        );
        res.send(community);
    }
    else {
        res.status(404).send({message: "Community not found. Could not update data"});
    }
};

exports.communityGetComunitiesByUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const auth = req.get('authorization');
    const negate = body.negate ?? false;

    if (!verifyToken(auth)) {
        res.status(401).send({message: "Token invalid"});
        return;
    }
    
    let community;

    if (!verifyToken(auth)) {
        res.status(401).send({message: "Token invalid"});
        return;
    }

    if (negate == true) {
        community = await Community.find({_users: {$ne: id}, active: true}).populate("_category");
    }
    else {
        community = await Community.find({_users: id, active: true}).populate("_category");
    }
    
    if (community) {
        res.send(community);
    }
    else {
        res.status(404).send({message: "Community not found"});
    }
};

exports.communityGetComunitiesDiscover = async (req, res) => {
    const { id } = req.params;
    const auth = req.get('authorization');

    if (!verifyToken(auth)) {
        res.status(401).send({message: "Token invalid"});
        return;
    }
    
    const community = await Community.find({_users: {$ne: id}, active: true}).populate("_category");
    
    if (community) {
        res.send(community);
    }
    else {
        res.status(404).send({message: "Community not found"});
    }
};