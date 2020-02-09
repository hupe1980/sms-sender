const middy = require('middy');
const { cors } = require('middy/middlewares');

const { createLogger } = require('../../../utils/create-logger');
const dynamoDb = require('../../../utils/dynamo-db');
const sns = require('../../../utils/sns');

const logger = createLogger();

const tableName = process.env.MESSAGES_TABLE;

const createMessage = async event => {
  logger.debug({ event });

  const body = JSON.parse(event.body);

  const params = {
    Message: body.message,
    PhoneNumber: body.phone
  };

  const { messageId } = await sns.publish(params);

  const item = {
    messageId,
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
