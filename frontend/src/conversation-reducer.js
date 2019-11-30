import { CHANGE_CONVERSATION } from './layout/actions';

export default (previousState = null, { type, payload }) => {
    if (type === CHANGE_CONVERSATION) {
        return payload;
    }
    return previousState;
};
