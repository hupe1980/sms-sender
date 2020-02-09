const AWS = require('aws-sdk');
const uuid = require('uuid');

const sns = new AWS.SNS({ apiVersion: '2010-03-31', region: 'eu-west-1' });

function publish(params) {
    if (process.env.IS_OFFLINE) {
        return {
          messageId: uuid.v4()
        };
    }
    return sns.publish(params).promise();
}

module.exports = {
  _sns: sns,
  publish
};