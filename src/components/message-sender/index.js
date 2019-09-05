import React from 'react';
import { makeStyles } from '@material-ui/core';

import MessageForm from './message-form';
import MessageTimeline from './message-timeline';

const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        display: 'flex',
        backgroundColor: 'white',
        // [theme.breakpoints.up('sm')]: {
        //     marginLeft: theme.drawerWidth,
        // },
    },
}));

export default function MessageSender() {
    const classes = useStyles();

    return (
        <>
            <MessageTimeline />
            <footer className={classes.footer}>
                <MessageForm />
            </footer>
        </>
    );
}
