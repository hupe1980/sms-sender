const middy = require('middy');
const { cors } = require('middy/middlewares');

const { createLogger } = require('../../../utils/create-logger');
const dynamoDb = require('../../../utils/dynamo-db');

const logger = createLogger();

const tableName = process.env.CONTACTS_TABLE;

const updateContact = async event => {
  logger.debug({ event });

  const contactId = event.pathParameters.contactId;
  const body = JSON.parse(event.body);

  const result = await dynamoDb.update({
    TableName: tableName,
    Key: {
      contactId
    },
    UpdateExpression: 'set #n = :name, phone = :phone, conversations = :conversations',
    ExpressionAttributeValues: {
      ':name': body.name,
      ':phone': body.phone,
      ':conversations': body.conversations
    },
    ExpressionAttributeNames: {
      '#n': 'name' // name conflicts with dynamos reserved words: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
    },
    ReturnValues: 'UPDATED_NEW'
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

module.exports.handler = middy(updateContact).use(cors({ credentials: true }));
