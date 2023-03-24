const { ListObjectsV2Command, S3Client } = require("@aws-sdk/client-s3");

const client = new S3Client({});
const bucket = [];
const getBucket = async () => {
  const command = new ListObjectsV2Command({
    Bucket: "silmilbucket",
  });

  try {
    let isTruncated = true;
    let result;
    while (isTruncated) {
      result = await client.send(command);

      isTruncated = result.IsTruncated;
      command.input.ContinuationToken = result.NextContinuationToken;
    }
    return await result.Contents;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getBucket };
