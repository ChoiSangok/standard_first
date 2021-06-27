// const APPROOT = require('app-root-path');
const express = require('express');
const router = express.Router();
const controller = require('./gateway.controller');

router.all('/autocomplete', controller.autocomplete);

module.exports = router;
