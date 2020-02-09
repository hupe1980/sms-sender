import { CHANGE_CONVERSATION, REMOVE_CONVERSATION } from './actions';

export default (previousState = null, { type, payload }) => {

    switch (type) {
        case CHANGE_CONVERSATION:
            return payload;
        case REMOVE_CONVERSATION:
            return null;
        default:
            return previousState;
    }
};
