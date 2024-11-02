import express from 'express';
import { getLogsWithSuspectDetails } from '../controllers/log.controller.js';

const router = express.Router();

router.get('/', getLogsWithSuspectDetails);

export default router;
