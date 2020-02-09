import React, { useState, useEffect } from 'react';
import { List, makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDataProvider, useVersion } from 'react-admin';

import SearchBar from './search-bar';
import ContactListItem from './contact-list-item';

const useStyles = makeStyles(theme => ({
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        flexGrow: 1,
    },
}));

export default function ContactsMenu({ onListItemClick }) {
    const classes = useStyles();
    const version = useVersion();
    const dataProvider = useDataProvider();

    const [contacts, setContacts] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchContacts = async () => {
            const { data } = await dataProvider.getList('contacts', {
                filter: {},
                sort: { field: 'id', order: 'ASC' },
                pagination: { page: 1, perPage: 50 },
            });
            setContacts(data);
        };
        fetchContacts();
    }, [dataProvider, version]);

    const renderListItems = () =>
        contacts
            .filter(({ name }) => name.startsWith(filter))
            .map(contact => (
                <ContactListItem
                    contact={contact}
                    key={contact.id}
                    onClick={onListItemClick}
                />
            ));

    if (!contacts) return <CircularProgress />;

    return (
        <>
            <SearchBar
                className={classes.searchBar}
                variant="outlined"
                placeholder="Namen eingeben"
                onSearch={setFilter}
            />
            <Divider />
            <List className={classes.list}>{renderListItems()}</List>
        </>
    );
}
