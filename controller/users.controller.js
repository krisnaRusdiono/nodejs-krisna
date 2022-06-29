const createError = require('http-errors');
const UserModel = require('../db/user.model');
const { signAt, signRt, parseAt } = require("../utilities/jwt");

module.exports = {
    base: async (req, res, next) => {
        try {
            res.send('this is response from users');
        } catch (error) {
            next(error);
        }
    },
    getAllUser: async (req, res, next) => {
        try {
            const userList = await UserModel.find();
            res.send(userList);
        } catch (error) {
            next(error);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const id = req.params.id;
            if(!id) throw createError.BadRequest();
            const user = await UserModel.findById(id);
            if(!user) res.send('Current user does not exist in database');
            res.send(user);
        } catch (error) {
            next(error);
        }
    },
    addUser: async (req, res, next) => {
        try {
            const body = req.body;
            if(!body) throw createError.BadRequest();
            const newUser = new UserModel(body);
            const savedUser = await newUser.save();
            if(!savedUser) throw createError.InternalServerError();
            res.send('User added bos!');
        } catch (error) {
            next(error);
        }
    },
    editUser: async (req, res, next) => {
        try {
            const body = req.body;
            if(!body) throw createError.BadRequest();
            const doesExist = await UserModel.findOne({username: body.username});
            if(!doesExist) throw createError.InternalServerError('cannot find user to update');
            const updatedUser = await UserModel.findOneAndUpdate({username: body.username}, body);
            if(!updatedUser) throw createError.InternalServerError();
            res.send('User updated bos!');
        } catch (error) {
            next(error);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const id = req.params.id;
            if(!id) throw createError.BadRequest();
            const doesExist = await UserModel.findById(id);
            if(!doesExist) throw createError.InternalServerError('cannot find user to delete');
            const deletedUser = await UserModel.findByIdAndDelete(id);
            if(!deletedUser) throw createError.InternalServerError();
            res.send('User deleted bos!');
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const body = req.body;
            if(!body) throw createError.BadRequest();
            const doesExist = await UserModel.findOne({username: body.username});
            if(!doesExist) res.send('cannot recognize your login credential');
            const isValidPassword = await doesExist.isValidPassword(body.password);
            if(!isValidPassword) throw createError.Unauthorized();
            const atoken = await signAt(doesExist.id);
            const rtoken = await signRt(doesExist.id);
            res.send({
                aToken: atoken,
                rToken: rtoken
            });
        } catch (error) {
            next(error);
        }
    },
}