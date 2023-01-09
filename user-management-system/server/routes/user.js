const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControllers');

router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.form);

module.exports = router;
