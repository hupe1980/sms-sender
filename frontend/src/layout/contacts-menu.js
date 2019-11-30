import React, { useState, useEffect } from 'react';
import { List, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDataProvider, useVersion } from 'react-admin';

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
        contacts.map(contact => (
            <ContactListItem
                contact={contact}
                key={contact.id}
                onClick={onListItemClick}
            />
        ));

    if (!contacts) return <CircularProgress />;

    return <List className={classes.list}>{renderListItems()}</List>;
}
