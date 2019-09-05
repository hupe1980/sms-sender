/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createContact = `mutation CreateContact($input: CreateContactInput!) {
  createContact(input: $input) {
    id
    name
    phone
  }
}
`;
export const updateContact = `mutation UpdateContact($input: UpdateContactInput!) {
  updateContact(input: $input) {
    id
    name
    phone
  }
}
`;
export const deleteContact = `mutation DeleteContact($input: DeleteContactInput!) {
  deleteContact(input: $input) {
    id
    name
    phone
  }
}
`;
export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    id
    from
    to
    body
    timestamp
  }
}
`;
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
    id
    from
    to
    body
    timestamp
  }
}
`;
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
    id
    from
    to
    body
    timestamp
  }
}
`;
