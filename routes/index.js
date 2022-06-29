const express = require('express');
const router = express.Router();
const ctrl = require('../controller/index.controller');

/* GET root API */
router.get('/', ctrl.base);

module.exports = router;
