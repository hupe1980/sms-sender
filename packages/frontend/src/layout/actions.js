export const CHANGE_CONVERSATION = 'CHANGE_CONVERSATION';

export const changeConversation = conversation => ({
    type: CHANGE_CONVERSATION,
    payload: conversation,
});
