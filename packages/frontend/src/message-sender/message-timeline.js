import React, { useState, useEffect, useRef } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    makeStyles,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
//import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useVersion, useDataProvider } from 'react-admin';

import Timeline from './timeline';
import TimelineEvent from './timeline-event';

const ITEM_HEIGHT = 48;

const useStyles = makeStyles(theme => ({
    avatar: {
        backgroundColor: red[500],
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    cardContent: {
        display: 'flex',
        overflow: 'auto',
        scrollBehavior: 'smooth'
    },
}));

export default function MessageTimeline({ contact }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [messages, setMessages] = useState([]);
    const version = useVersion();
    const dataProvider = useDataProvider();

    const messagesEndRef = useRef(null);
    const { contactId, name, phone } = contact;

    useEffect(() => {
       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); 
    }, [messages]);

    useEffect(() => {
        const fetchConversations = async () => {
            const { data } = await dataProvider('GET_LIST', 'messages', {
                filter: { contactId },
                sort: { field: 'createdAt', order: 'DESC' },
                pagination: { page: 1, perPage: 50 },
            });
            setMessages(data);
        };

        fetchConversations();
    }, [dataProvider, version, contactId]);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderEvents = () =>
        messages.map(({message, createdAt, from, id}) => (
            <TimelineEvent
                key={id}
                title={`Nachricht von ${from}`}
                createdAt={new Date(createdAt).toLocaleString()}
                icon={<TextsmsOutlinedIcon />}
            >
                {message}
            </TimelineEvent>
        ));

    return (
        <>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="more"
                            aria-controls="menu"
                            aria-haspopup="true"
                            className={classes.avatar}
                        >
                            {name.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={name}
                    subheader={phone}
                />
                <CardContent className={classes.cardContent}>
                    <Timeline>
                        {renderEvents()}
                        <div ref={messagesEndRef} />
                    </Timeline>
                </CardContent>
            </Card>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                    },
                }}
            >
                <MenuItem onClick={handleClose}>
                    Gesrächsverlauf löschen
                </MenuItem>
                ))}
            </Menu>
        </>
    );
}
