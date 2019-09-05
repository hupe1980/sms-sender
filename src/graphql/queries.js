/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContact = `query GetContact($id: ID!) {
  getContact(id: $id) {
    id
    name
    phone
  }
}
`;
export const listContacts = `query ListContacts(
  $filter: ModelContactFilterInput
  $limit: Int
  $nextToken: String
) {
  listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      phone
    }
    nextToken
  }
}
`;
export const getMessage = `query GetMessage($id: ID!) {
  getMessage(id: $id) {
    id
    from
    to
    body
    timestamp
  }
}
`;
export const listMessages = `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      from
      to
      body
      timestamp
    }
    nextToken
  }
}
`;
