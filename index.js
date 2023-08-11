import express from "express";
import AWS from "aws-sdk";
import { config } from "dotenv";

// Initialize express
const app = express();

// config() will read .env file, parse the contents, assign it to process.env.
config();

// Create S3 instance
const cloudFront = new AWS.CloudFront.Signer(
  process.env.CLOUDFRONT_KEY_PAIR_ID,
  process.env.CLOUDFRONT_PRIVATE_KEY
);

// Routes
app.get("/get-signed-url", (req, res) => {
    
  const params = {
    url: `https://d14c42fg33crpi.cloudfront.net/laptop.jpg`,
    expires: Math.floor((Date.now() + 5 * 60 * 1000) / 1000),
  };

  cloudFront.getSignedUrl(params, (err, url) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error generating signed URL");
    } else {
      console.log("Signed URL:", url);
      res.send(url);
    }
  });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
