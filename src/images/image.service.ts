import fs from "fs";
import sharp from "sharp";
import Logger from "../logger/logger.service";
import path from "path";

export default class ImageService {
  private readonly logger = new Logger(ImageService.name);

  async processSaveImage(buffer: string, id: string, sizes: number[]) {
    const imgBuffer = await this.convertStrToBuffer(buffer);
    const imgWebpBuffer = await this.convertToWebp(imgBuffer);
  
    await this.save(imgWebpBuffer, `${id}_original`);
  
    for (const size of sizes) {
      const resizedImg = await this.resizing(imgWebpBuffer, size);
      await this.save(resizedImg, `${id}_${size}`);
    }
  
    return;
  }
  

  async processDeleteImage(id: string) {
    const directoryPath = "media/";
    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
      // Перевіряємо, чи файл відповідає патерну `${id}_розмір.webp`
      if (file.startsWith(id) && file.endsWith(".webp")) {
        this.delete(path.join(directoryPath, file));
      }
    });

    this.logger.log("All images with the given ID deleted");
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
      this.logger.log(`${filePath}, was deleted`);
    } catch (error) {
      this.logger.err(`Error deleting ${filePath}, image missing.`);
    }
  }
}
