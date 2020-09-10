const AWS = require("aws-sdk");
const CF = new AWS.CloudFront();

module.exports = (
  distribution,
  invalidateList = ["/*"]
) => {
  return new Promise((resolve, reject) => {
    const invalidationObject = {
      DistributionId: distribution,
      InvalidationBatch: {
        CallerReference: new Date().getTime().toString(),
        Paths: {
          Quantity: invalidateList.length,
          Items: invalidateList,
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
