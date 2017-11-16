const express = require('express');
const router = express.Router();
const punchController = require('../controllers/punchController');
const { catchErrors } = require('../handlers/errorHandlers');
router.get('/', punchController.homePage);
router.get('/punch-archive', catchErrors(punchController.getPunches));

router.post('/', catchErrors(punchController.createPunch));
module.exports = router;
