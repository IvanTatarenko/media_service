import fs from "fs";
import sharp from "sharp";

export default class ImageService {
  async processSaveImage(buffer: string, id: string) {
    const imgBuffer = await this.convertStrToBuffer(buffer);
    const imgWebpBuffer = await this.convertToWebp(imgBuffer);
    await this.save(imgWebpBuffer, id + "_original");
    const img200 = await this.resizing(imgWebpBuffer, 200);
    await this.save(img200, id + "_200");
    return 'ok';
  }

  async save(buffer: Buffer, name: string) {
    const filePath = `media/`;
    fs.writeFile(filePath + name + ".webp", buffer, (err) => {
      if (err) {
        console.error(`[ImageService] Error writing file ${name}`, err);
      } else {
        console.log(`[ImageService] File ${name} written successfully`);
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
}
