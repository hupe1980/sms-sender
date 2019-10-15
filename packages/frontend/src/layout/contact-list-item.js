import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { useUpdate, useRefresh } from 'react-admin';

export default function ContactListItem({ contact, onClick }) {
    const refresh = useRefresh();

    const conversations = new Set(contact.conversations || []);
    conversations.add('abc'); //sub
    const diff = { ...contact, conversations: Array.from(conversations) };
    
    const [update] = useUpdate('contacts', contact.id, diff, contact, {
        onSuccess: () => {
            refresh();
            onClick();
        }
    });

    return (
        <ListItem key={contact.id} button onClick={update}>
            <ListItemText primary={contact.name} secondary={contact.phone} />
        </ListItem>
    );
}

