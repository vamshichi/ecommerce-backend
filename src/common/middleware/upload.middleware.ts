//This keeps files in memory before sending to S3.

import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({ storage });