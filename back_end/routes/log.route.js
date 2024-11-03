import express from 'express';
import { getLogsWithSuspectDetails,deleteLog } from '../controllers/log.controller.js';

const router = express.Router();

router.get('/', getLogsWithSuspectDetails);
router.delete('/:id', deleteLog);

export default router;
