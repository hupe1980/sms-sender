import React from 'react';
import { createBrowserHistory } from 'history';
import { Admin, Resource } from 'react-admin';
import { withAuthenticator, Greetings } from 'amplify-material-ui';

import awsconfig from './aws-exports';

import amplifyRestProvider, {
    parseResponse,
    buildDataRequest,
} from './data-provider';

import conversationReducer from './conversation-reducer';

import theme from './theme';
import Layout from './layout';

import contacts from './resources/contacts';
import MessageSender from './message-sender';

const history = createBrowserHistory();

const authProvider = () => Promise.resolve();

function App() {
    return (
        <Admin
            authProvider={authProvider}
            customReducers={{ conversation: conversationReducer }}
            dataProvider={amplifyRestProvider({
                apiName: awsconfig.aws_cloud_logic_custom[0].name,
                parseResponse,
                buildDataRequest,
            })}
            layout={Layout}
            history={history}
            dashboard={MessageSender}
        >
            <Resource name="contacts" {...contacts} />
            <Resource name="messages" intent="registration" />
        </Admin>
    );
}

export default withAuthenticator(App, {
    hide: [Greetings],
    theme,
});
