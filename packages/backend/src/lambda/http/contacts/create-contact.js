const uuid = require('uuid');
const middy = require('middy');
const { cors } = require('middy/middlewares');

const { createLogger } = require('../../../utils/create-logger');
const dynamoDb = require('../../../utils/dynamo-db');

const logger = createLogger();

const tableName = process.env.CONTACTS_TABLE;

const createContact = async event => {
  logger.debug({ event });

   const body = JSON.parse(event.body)
   
   const item = {
     contactId: uuid.v4(),
     ...body
   };

   await dynamoDb.put({
     TableName: tableName,
     Item: item,
     ReturnValues: 'ALL_OLD'
   });

   const data = {
     ...item,
     id: item.contactId
   };


  return {
    statusCode: 200,
    body: JSON.stringify({
      data
    })
  };
};

module.exports.handler = middy(createContact).use(cors({ credentials: true }));
