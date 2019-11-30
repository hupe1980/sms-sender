import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { useUpdate, useRefresh } from 'react-admin';
import { useAuthContext } from 'amplify-auth-hooks';

export default function ContactListItem({ contact, onClick }) {
    const refresh = useRefresh();
    const { authData } = useAuthContext();

    const conversations = new Set(contact.conversations || []);
    conversations.add(authData.username);
    const diff = { ...contact, conversations: Array.from(conversations) };

    const [update] = useUpdate('contacts', contact.id, diff, contact, {
        onSuccess: () => {
            refresh();
            onClick();
        },
    });

    return (
        <ListItem key={contact.id} button onClick={update}>
            <ListItemText primary={contact.name} secondary={contact.phone} />
        </ListItem>
    );
}
