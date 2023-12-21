import ImageService from "./image.service";

export default class ImageController {
  // Отримання списку користувачів
  async getAll(req: any, res: any) {
    res.send("media service");
  }

  async processSaveImage(req: any, res: any) {
    const imageService = new ImageService();
    const result = imageService.processSaveImage(req.body.buffer, req.body.id);
    res.send(result);
  }

  async deleteImage(req: any, res: any) {
    const imageService = new ImageService();
    const { id } = req.params;
    const result = imageService.processDeleteImage(id);
    res.send(result);
  }
}
