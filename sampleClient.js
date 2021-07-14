// Create service client module using CommonJS syntax.
const { S3Client } = require("@aws-sdk/client-s3");
// Set the AWS Region.
const REGION = "eu-south-1"; //e.g. "us-east-1"
//  // Create Amazon S3 service object.
 const s3 = new S3Client({ region: REGION })
 console.log(s3.config);
//  const s3 = new S3Client()
 
// Export 's3' constant.
module.exports = {s3};