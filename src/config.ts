import dotenv from "dotenv";
dotenv.config();

const config = {
  contentPath: process.env.CONTENT_PATH || "./documents",
  outputPath: process.env.OUTPUT_PATH || "./public",
};

export default config;
