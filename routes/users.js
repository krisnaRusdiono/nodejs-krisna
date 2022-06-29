const express = require('express');
const router = express.Router();
const ctrl = require('../controller/users.controller');

/* GET users root */
router.get('/', ctrl.base);

/* GET users list */
router.get('/get-users', ctrl.getAllUser);

/* GET user by id */
router.get('/get-user/:id', ctrl.getUserById);

/* ADD new user */
router.post('/add-user', ctrl.addUser);

/* EDIT current user */
router.put('/edit-user', ctrl.editUser);

/* DELETE current user */
router.delete('/delete-user/:id', ctrl.deleteUser);

/* SIMULATE Login */
router.post('/login', ctrl.login);

module.exports = router;
