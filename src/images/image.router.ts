import express from "express";
import ImageController from "./image.controller";
const router = express.Router();

const imageController = new ImageController();

router.get('/', imageController.getAll);

router.post('/', imageController.processSaveImage);

router.delete('/:id', imageController.deleteImage);

export default router;
