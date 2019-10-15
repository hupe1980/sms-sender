const uuid = require('uuid');
const middy = require('middy');
const { cors } = require('middy/middlewares');

const { createLogger } = require('../../../utils/create-logger');
const dynamoDb = require('../../../utils/dynamo-db');

const logger = createLogger();

const tableName = process.env.MESSAGES_TABLE;

const createMessage = async event => {
  logger.debug({ event });

  const body = JSON.parse(event.body);

  const item = {
    messageId: uuid.v4(),
    createdAt: new Date().toISOString(),
    ...body
  };

  await dynamoDb.put({
    TableName: tableName,
    Item: item,
    ReturnValues: 'ALL_OLD'
  });

  const data = {
    ...item,
    id: item.messageId
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      data
    })
  };
};

module.exports.handler = middy(createMessage).use(cors({ credentials: true }));
