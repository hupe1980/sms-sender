import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
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
import {
    useVersion,
    useDataProvider,
    useUpdate,
    useRefresh,
} from 'react-admin';
import { useAuthContext } from 'amplify-auth-hooks';

import { removeConversation } from '../actions';
import Timeline from './timeline';
import TimelineEvent from './timeline-event';

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
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
        scrollBehavior: 'smooth',
    },
}));

export default function MessageTimeline({ contact }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [messages, setMessages] = useState([]);
    const version = useVersion();
    const refresh = useRefresh();
    const dataProvider = useDataProvider();
    const { authData } = useAuthContext();
    const dispatch = useDispatch();

    const messagesEndRef = useRef(null);
    const { contactId, name, phone, conversations } = contact;

    const newConversation = conversations.filter(
        (name) => name !== authData.username,
    );

    const diff = { ...contact, conversations: newConversation };

    const [update] = useUpdate('contacts', contact.id, diff, contact, {
        onSuccess: () => {
            dispatch(removeConversation());
            refresh();
        },
    });

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const fetchConversations = async () => {
            const { data } = await dataProvider.getList('messages', {
                filter: { contactId },
                sort: { field: 'createdAt', order: 'DESC' },
                pagination: { page: 1, perPage: 50 },
            });
            setMessages(data);
        };

        fetchConversations();
    }, [dataProvider, version, contactId]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemoveButtonClick = () => {
        handleClose();
        update();
    };

    const renderEvents = () =>
        messages.map(({ message, createdAt, from, id }) => (
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
                        width: 310,
                    },
                }}
            >
                <MenuItem onClick={handleRemoveButtonClick}>
                    Gesprächsverlauf aus Liste entfernen
                </MenuItem>
            </Menu>
        </>
    );
}
