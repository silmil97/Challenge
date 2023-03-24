const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const client = new S3Client({});

const putObject = async (filename, filepath) => {
  const command = new PutObjectCommand({
    Bucket: "silmilbucket",
    Key: filename,
    Body: filepath,
  });

  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { putObject };
