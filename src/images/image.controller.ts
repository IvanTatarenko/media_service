import { Request, Response } from "express";
import ImageService from "./image.service";

export default class ImageController {
  async getAll(req: Request, res: Response) {
    res.send("media service");
  }

  async processSaveImage(req: Request, res: Response) {
    const imageService = new ImageService();
    try {
      await imageService.processSaveImage(
        req.body.buffer,
        req.body.id,
        req.body.sizes || [200, 500, 1000]
      );
      res.status(201).json("Created");
    } catch (error: any) {
      res.status(500).send("Error created image");
    }
  }

  async deleteImage(req: Request, res: Response) {
    const imageService = new ImageService();
    const { id } = req.params;
    try {
      await imageService.processDeleteImage(id);
      res.status(200).send("Deleted");
    }
    catch {
      res.status(500).send("Error deleted image");
    }
    
    
  }
}
