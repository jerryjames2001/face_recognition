import express from 'express';
import { createCamera, delCamera, getCameras } from '../controllers/camera.controller.js';

const router = express.Router();

router.get('/', getCameras);
router.post('/', createCamera);
router.delete('/:id', delCamera);

export default router;