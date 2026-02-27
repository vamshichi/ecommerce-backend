import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../infrastructure/storage/s3.client";
import { v4 as uuidv4 } from "uuid";

export class ProductImageService {

  async uploadImage(file: Express.Multer.File) {

    const key = `products/${uuidv4()}-${file.originalname}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype
      })
    );

    return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }

}