const express = require('express');
const viewsController = require('../controllers/viewsControllers');


const router = express.Router();


router.get('/', viewsController.getHomePage);






module.exports = router;