import {
  getMechanic,
  getAllMechanics,
  createMechanic,
} from '../controllers/mechanicController';
import logger from '../utility/logger';
import express = require('express');

const router = express.Router();

logger.debug('Mechanic Route Loaded');
router.route('/:id').get(getMechanic);
router.route('/').get(getAllMechanics).post(createMechanic);

export default router;
