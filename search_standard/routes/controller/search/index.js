// const APPROOT = require('app-root-path');
const express = require('express');
const router = express.Router();
const controller = require('./search.controller');

router.all('/search', controller.main);

module.exports = router;
