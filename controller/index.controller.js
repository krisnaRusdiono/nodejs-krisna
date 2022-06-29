module.exports = {
    base: async (req, res, next) => {
        try {
            res.send('this is response from index');
        } catch (error) {
            next(error);
        }
    }
};