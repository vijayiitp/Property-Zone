import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });


const s3 = new S3Client({
region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


/**
 * Upload file to S3
 * @param {string} filePath - Local path to file
 * @param {string} key - File key in S3 (folder/filename.ext)
 * @param {string} contentType - MIME type of file
 */
export async function uploadFile(filePath, key, contentType = "application/octet-stream") {
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: fileStream,
    ContentType: contentType,
  };
  try {
    await s3.send(new PutObjectCommand(uploadParams));
    console.log(`✅ File uploaded: ${key}`);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (err) {
    console.error("❌ Upload failed:", err);
    throw err;
  }
}

/**
 * Get signed URL for file in S3
 * @param {string} key - File key in S3
 * @param {number} expiresIn - URL expiration time in seconds
 */
export async function getFileUrl(key, expiresIn = 3600) {
  if (!key) {
    throw new Error("❌ S3 key is required to generate a signed URL.");
  }

  if (!process.env.AWS_BUCKET_NAME) {
    throw new Error("❌ AWS_BUCKET_NAME is not set in environment variables.");
  }

  if (!process.env.AWS_REGION) {
    throw new Error("❌ AWS_REGION is not set in environment variables.");
  }

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  try {
    return await getSignedUrl(s3, command, { expiresIn });
  } catch (err) {
    console.error("❌ Error generating signed URL:", err);
    throw err;
  }
}

/**
 * Delete file from S3
 * @param {string} key - File key in S3
 */
export async function deleteFile(key) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `properties/${key}`,
  });

  try {
    await s3.send(command);
    console.log(`🗑️ File deleted: ${key}`);
  } catch (err) {
    console.error("❌ Delete failed:", err);
    throw err;
  }
}
