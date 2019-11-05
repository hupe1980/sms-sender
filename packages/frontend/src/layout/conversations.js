import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    Divider,
    List,
    ListItem,
    ListItemText,
    makeStyles,
} from '@material-ui/core';
import { useVersion, useDataProvider } from 'react-admin';
import { useAuthContext } from 'amplify-material-ui';

import SearchBar from './search-bar';
import { changeConversation } from './actions';

const useStyles = makeStyles(theme => ({
    searchBar: {
        padding: theme.spacing(1),
    },
}));

export default function Conversations(props) {
    const classes = useStyles();
    const [conversations, setConversations] = useState([]);
    const version = useVersion();
    const dataProvider = useDataProvider();
    const dispatch = useDispatch();
    const { authData } = useAuthContext();

    useEffect(() => {
        const fetchConversations = async () => {

            const ret = await dataProvider.getList('contacts', {
                filter: { conversation: authData.username },
                sort: { field: 'name', order: 'DESC' },
                pagination: { page: 1, perPage: 50 },
            });
            if(!ret) return;
            const { data } = ret;
            setConversations(data);
        };

        fetchConversations();
    }, [dataProvider, version]);

    return (
        <>
            <SearchBar
                className={classes.searchBar}
                variant="outlined"
                placeholder="Namen eingeben"
            />
            <Divider />
            <List>
                {conversations.map(({ id, name, phone }) => (
                    <ListItem
                        button
                        key={id}
                        onClick={() => dispatch(changeConversation(id))}
                    >
                        <ListItemText primary={name} secondary={phone} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}
