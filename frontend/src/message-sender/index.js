import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useDataProvider } from 'react-admin';

import MessageForm from './message-form';
import MessageTimeline from './message-timeline';

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        display: 'flex',
        backgroundColor: 'white',
    },
}));

export default function MessageSender() {
    const classes = useStyles();
    const conversation = useSelector((state) => state.conversation);
    const dataProvider = useDataProvider();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchConversations = async () => {
            if (!conversation) {
                setContact(null);
                return;
            }

            const { data } = await dataProvider.getOne('contacts', {
                id: conversation,
            });
            setContact(data);
        };

        fetchConversations();
    }, [conversation, dataProvider]);

    if (!contact) return <div>Loading</div>;

    return (
        <>
            <MessageTimeline contact={contact} />
            <footer className={classes.footer}>
                <MessageForm contact={contact} />
            </footer>
        </>
    );
}
