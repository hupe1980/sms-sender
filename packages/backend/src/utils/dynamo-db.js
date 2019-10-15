const AWS = require('aws-sdk');

function createDynamoDBClient() {
  let options = {};
  if (process.env.IS_OFFLINE) {
    options = {
      region: 'eu-central-1',
      endpoint: 'localstack:4569',
      sslEnabled: false,
      accessKeyId: 'accessKeyId',
      secretAccessKey: 'secretAccessKey'
    };
  }

  return new AWS.DynamoDB.DocumentClient(options);
}

const dynamoDb = createDynamoDBClient();

function get(params) {
  return dynamoDb.get(params).promise();
}

function scan(params) {
  return dynamoDb.scan(params).promise();
}

function query(params) {
  return dynamoDb.query(params).promise();
}

function put(params) {
  return dynamoDb.put(params).promise();
}

function update(params) {
  return dynamoDb.update(params).promise();
}

function del(params) {
  return dynamoDb.delete(params).promise();
}

module.exports = {
  _dynamoDb: dynamoDb,
  scan,
  query,
  put,
  update,
  del,
  get
};
