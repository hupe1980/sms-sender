import gql from 'graphql-tag';
import { Auth } from 'aws-amplify';
import pluralize from 'pluralize';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
} from 'react-admin';
import buildGraphQLProvider, { buildQuery } from 'ra-data-graphql-simple';

import awsconfig from '../../aws-exports';

const client = new AWSAppSyncClient({
    url: awsconfig.aws_appsync_graphqlEndpoint,
    region: awsconfig.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () =>
            (await Auth.currentSession()).getIdToken().getJwtToken(),
    },
});

const introspection = {
    operationNames: {
        [GET_LIST]: resource => `list${pluralize(resource.name)}`,
        [GET_ONE]: resource => `get${resource.name}`,
        [GET_MANY]: resource => `list${pluralize(resource.name)}`,
        [GET_MANY_REFERENCE]: resource => `list${pluralize(resource.name)}`,
        [CREATE]: resource => `create${resource.name}`,
        [UPDATE]: resource => `update${resource.name}`,
        [DELETE]: resource => `delete${resource.name}`,
    },
    exclude: undefined,
    include: undefined,
};

const myBuildQuery = introspection => (type, resource, payload) => {
    console.log(introspection, type, resource, payload);
    const builtQuery = buildQuery(introspection)(type, resource, payload);

    if (resource === 'Command' && type === 'GET_ONE') {
        return {
            // Use the default query variables and parseResponse
            ...builtQuery,
            // Override the query
            query: gql`
                query Command($id: ID!) {
                    data: Command(id: $id) {
                        id
                        reference
                        customer {
                            id
                            firstName
                            lastName
                        }
                    }
                }
            `,
        };
    }

    return builtQuery;
};

export default async () => {
    const dataProvider = await buildGraphQLProvider({
        client,
        buildQuery: myBuildQuery,
        introspection,
    });
    return dataProvider;
};
