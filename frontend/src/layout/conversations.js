import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { useVersion, useDataProvider } from 'react-admin';
import { useAuthContext } from 'amplify-auth-hooks';

import { changeConversation } from '../actions';

export default function Conversations(props) {
    const [conversations, setConversations] = useState([]);
    const version = useVersion();
    const dataProvider = useDataProvider();
    const dispatch = useDispatch();
    const { authData } = useAuthContext();
    const history = useHistory(); 

    useEffect(() => {
        const fetchConversations = async () => {
            const ret = await dataProvider.getList('contacts', {
                filter: { conversation: authData.username },
                sort: { field: 'name', order: 'DESC' },
                pagination: { page: 1, perPage: 50 },
            });
            if (!ret) return;
            const { data } = ret;
            setConversations(data);
        };

        fetchConversations();
    }, [authData.username, dataProvider, version]);

    const handleClick = id => {
        history.push('/');
        dispatch(changeConversation(id));
    };

    return (
        <List>
            {conversations.map(({ id, name, phone }) => (
                <ListItem button key={id} onClick={() => handleClick(id)}>
                    <ListItemText primary={name} secondary={phone} />
                </ListItem>
            ))}
        </List>
    );
}
