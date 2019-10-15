import { GET_LIST, GET_MANY_REFERENCE, CREATE } from 'ra-core';
import dataProvider, {
    buildDataRequest as defaultBuildDataRequest,
    parseResponse as deffaultParseResponse
} from 'ra-data-amplify-rest';

export const parseResponse = (response, type, resource, params) => {
    const { data, total } = response;

    switch (type) {
        case GET_LIST:
        case GET_MANY_REFERENCE:
            return {
                data,
                total,
            };
        default:
            return deffaultParseResponse(response, type, resource, params);
    }
};

export const buildDataRequest = (type, resource, params) => {
    console.log(type, resource, params);

    return defaultBuildDataRequest(type, resource, params);
};

export default dataProvider;
