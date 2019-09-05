import pluralize from 'pluralize';
import { API, graphqlOperation } from 'aws-amplify';
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
} from 'react-admin';

const QUERY_TYPES = [GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE];

const operationNames = {
    [GET_LIST]: resource => `list${pluralize(resource)}`,
    [GET_ONE]: resource => `get${resource}`,
    [GET_MANY]: resource => `list${pluralize(resource)}`,
    [GET_MANY_REFERENCE]: resource => `list${pluralize(resource)}`,
    [CREATE]: resource => `create${resource}`,
    [UPDATE]: resource => `update${resource}`,
    [DELETE]: resource => `delete${resource}`,
};

const createResultParser = (fetchType, resourceName) => result => {
    const operation = operationNames[fetchType](resourceName);

    if (
        fetchType === GET_LIST ||
        fetchType === GET_MANY ||
        fetchType === GET_MANY_REFERENCE
    ) {
        return {
            data: result.data[operation].items,
            total: result.data[operation].items.length,
        };
    }

    return {
        data: result.data[operation],
    };
};

const AppSyncProvider = ({ queries, mutations, subscriptions }) => {
    return async (fetchType, resourceName, params) => {
        console.log(fetchType, resourceName, params);
        resourceName = 'Contact';
        const operation = operationNames[fetchType](resourceName);
        const parseResult = createResultParser(fetchType, resourceName);

        if (QUERY_TYPES.includes(fetchType)) {
            const query =
                fetchType === GET_ONE
                    ? graphqlOperation(queries[operation], params)
                    : graphqlOperation(queries[operation]);

            const result = await API.graphql(query);

            return parseResult(result);
        }

        console.log(mutations[operation], operation);
        console.log(params);

        const result = await API.graphql(
            graphqlOperation(mutations[operation], {
                input: { ...params.data },
            }),
        );

        return parseResult(result);
    };
};

export default AppSyncProvider;
