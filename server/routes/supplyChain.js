const express = require('express');
const router = express.Router();

const supplyChainController = require('../controllers/supplyChain.js');

router.post('/register', supplyChainController.register);
router.get('', supplyChainController.showAll);

module.exports = router;
