import React from 'react';
import { Datagrid, List, TextField } from 'react-admin';

import ListActionToolbar from '../list-action-toolbar';

export default function ContactList(props) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="name" />
                <TextField source="phone" />
                <ListActionToolbar />
            </Datagrid>
        </List>
    );
}
