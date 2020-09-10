const AWS = require("aws-sdk");
const CF = new AWS.CloudFront();

module.exports = (
  distributionId,
  pathsToInvalidate = ["/*"]
) => {
  return new Promise((resolve, reject) => {
    const invalidationObject = {
      DistributionId: distributionId,
      InvalidationBatch: {
        CallerReference: new Date().getTime().toString(),
        Paths: {
          Quantity: pathsToInvalidate.length,
          Items: pathsToInvalidate,
        },
      },
    };

    const cb = (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    };

    CF.createInvalidation(invalidationObject, cb);
  });
};
