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
            res.send('this should send all user list');
        } catch (error) {
            next(error);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            res.send('this should send user from current id');
        } catch (error) {
            next(error);
        }
    },
    addUser: async (req, res, next) => {
        try {
            res.send('this should post a new user to db');
        } catch (error) {
            next(error);
        }
    },
    editUser: async (req, res, next) => {
        try {
            res.send('this should edit current user data');
        } catch (error) {
            next(error);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            res.send('this should delete user data');
        } catch (error) {
            next(error);
        }
    },
}