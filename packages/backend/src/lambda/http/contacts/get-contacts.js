const middy = require('middy');
const { cors } = require('middy/middlewares');

const { createLogger } = require('../../../utils/create-logger');
const dynamoDb = require('../../../utils/dynamo-db');

const logger = createLogger();

const tableName = process.env.CONTACTS_TABLE;

const getContacts = async event => {
  logger.debug({ event });

  const rawFilter = event.queryStringParameters.filter;

  const filter = JSON.parse(rawFilter);
  const { conversation } = filter; 

  const params = conversation
    ? {
        TableName: tableName,
        FilterExpression: 'contains(conversations, :conversation)',
        ExpressionAttributeValues: {
          ':conversation': conversation
        }
      }
    : { TableName: tableName };

  const result = await dynamoDb.scan(params);

  const data = result.Items.map(resource => ({
    ...resource,
    id: resource.contactId
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
      total: data.length
    })
  };
};

module.exports.handler = middy(getContacts).use(cors({ credentials: true }));
