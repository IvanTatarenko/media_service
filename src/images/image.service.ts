import fs from "fs";
import sharp from "sharp";
import Logger from "../logger/logger.service";
import { Response } from "express";

export default class ImageService {
  private readonly logger = new Logger(ImageService.name);

  async processSaveImage(buffer: string, id: string) {
    const imgBuffer = await this.convertStrToBuffer(buffer);
    const imgWebpBuffer = await this.convertToWebp(imgBuffer);
    await this.save(imgWebpBuffer, id + "_original");
    const img200 = await this.resizing(imgWebpBuffer, 200);
    await this.save(img200, id + "_200");
    return;
  }

  async processDeleteImage(id: string) {
    await this.delete(`media/${id}_original.webp`);
    await this.delete(`media/${id}_200.webp`);
    this.logger.log("Image deleted");
    return;
  }

  async save(buffer: Buffer, name: string) {
    const filePath = `media/`;
    fs.writeFile(filePath + name + ".webp", buffer, (err) => {
      if (err) {
        this.logger.err(`Error writing file ${name}, ${err}`);
      } else {
        this.logger.log(`File ${name} written successfully`);
      }
    });
  }

  async convertToWebp(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer).webp().toBuffer();
  }

  async convertStrToBuffer(str: string): Promise<Buffer> {
    return Buffer.from(str, "base64");
  }

  async resizing(buffer: Buffer, size: number): Promise<Buffer> {
    return sharp(buffer).resize(size).toBuffer();
  }

  async delete(filePath: string) {
    try {
      fs.unlinkSync(filePath);
    } catch {
      return "err";
    }
  }
}
