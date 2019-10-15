const middy = require('middy');
const { cors } = require('middy/middlewares');

const { createLogger } = require('../../../utils/create-logger');
const dynamoDb = require('../../../utils/dynamo-db');

const logger = createLogger();

const tableName = process.env.CONTACTS_TABLE;

const deleteContact = async event => {
  logger.debug({ event });

  const contactId = event.pathParameters.contactId;

  const result = await dynamoDb.del({
    TableName: tableName,
    Key: {
      contactId
    }
  });

  const data = {
    contactId,
    ...result.Attributes,
    id: contactId
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      data
    })
  };
};

module.exports.handler = middy(deleteContact).use(cors({ credentials: true }));
