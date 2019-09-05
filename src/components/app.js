import React from 'react';
import { createBrowserHistory } from 'history';
import { Admin, Resource } from 'react-admin';
import { withAuthenticator, Greetings } from 'amplify-material-ui';

import theme from './theme';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

import dataProvider from './data-provider';
import Layout from './layout';
import contacts from './contacts';
import MessageSender from './message-sender';

const history = createBrowserHistory();

const authProvider = () => Promise.resolve();

function App() {
    return (
        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider({ queries, mutations })}
            layout={Layout}
            history={history}
            dashboard={MessageSender}
        >
            <Resource name="contacts" {...contacts} />
        </Admin>
    );
}

export default withAuthenticator(App, {
    hide: [Greetings],
    theme,
});
