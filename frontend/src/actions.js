export const CHANGE_CONVERSATION = 'CHANGE_CONVERSATION';
export const REMOVE_CONVERSATION = 'REMOVE_CONVERSATION';

export const changeConversation = conversation => ({
    type: CHANGE_CONVERSATION,
    payload: conversation,
});

export const removeConversation = conversation => ({
    type: REMOVE_CONVERSATION,
    payload: conversation,
});
