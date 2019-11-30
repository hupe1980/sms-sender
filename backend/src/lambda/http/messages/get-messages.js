const middy = require('middy');
const { cors } = require('middy/middlewares');

const { createLogger } = require('../../../utils/create-logger');
const dynamoDb = require('../../../utils/dynamo-db');

const logger = createLogger();

const tableName = process.env.MESSAGES_TABLE;
const indexName = process.env.CONTACT_ID_INDEX;

const getMessages = async event => {
  logger.debug({ event });

  const rawFilter = event.queryStringParameters.filter;

  const filter = JSON.parse(rawFilter);
  const { contactId } = filter; 

  const result = await dynamoDb.query({
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression: 'contactId = :contactId',
    ExpressionAttributeValues: {
      ':contactId': contactId,
    }
  });

  const data = result.Items.map(resource => ({
    ...resource,
    id: resource.messageId
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
      total: data.length
    })
  };
};

module.exports.handler = middy(getMessages).use(cors({ credentials: true }));
