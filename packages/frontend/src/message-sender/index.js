import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useGetOne } from 'react-admin';

import MessageForm from './message-form';
import MessageTimeline from './message-timeline';

const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        display: 'flex',
        backgroundColor: 'white',
    },
}));

export default function MessageSender() {
    const classes = useStyles();
    const conversation = useSelector(state => state.conversation);

    const { data: contact, loading } = useGetOne('contacts', conversation);

    if(!contact || loading) return <div>Loading</div>;

    console.log('######', contact);

    return (
        <>
            <MessageTimeline contact={contact} />
            <footer className={classes.footer}>
                <MessageForm contact={contact} />
            </footer>
        </>
    );
}
