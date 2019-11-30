import {
    defaultResponseParser,
    defaultRequestBuilder,
} from 'ra-data-amplify-rest';

defaultResponseParser.getList = response => {
    const { data, total } = response;
    return {
        data,
        total,
    };
};

defaultResponseParser.getManyReference = response => {
    const { data, total } = response;
    return {
        data,
        total,
    };
};

defaultRequestBuilder.create = (resource, params) => {
    console.log(resource, params);
    const init = {
        body: params.data,
    };

    const path = `/${resource}`;

    return {
        path,
        init,
    };
}

export {
    defaultResponseParser as customResponseParser,
    defaultRequestBuilder as customRequestBuilder,
};
