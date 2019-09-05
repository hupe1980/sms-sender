import React from 'react';
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
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
    },
}));

export default function MessageTimeline() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    //subheader="September 14, 2016"
                />
                <CardContent className={classes.cardContent}>
                    <Timeline>
                        <TimelineEvent
                            title="John Doe sent a SMS to Text"
                            createdAt="2016-09-12 10:06 PM"
                            icon={<TextsmsOutlinedIcon />}
                        >
                            I received the payment for $543. Should be shipping
                            the item within a couple of hours.
                        </TimelineEvent>
                        <TimelineEvent
                            title="You sent an email to John Doe"
                            createdAt="2016-09-11 09:06 AM"
                            icon={<EmailOutlinedIcon />}
                        >
                            Like we talked, you said that you would share the
                            shipment details? This is an urgent order and so I
                            am losing patience. Can you expedite the process and
                            pls do share the details asap. Consider this a
                            gentle reminder if you are on track already!
                        </TimelineEvent>
                        <TimelineEvent
                            title="John Doe sent a SMS to Text"
                            createdAt="2016-09-12 10:06 PM"
                            icon={<TextsmsOutlinedIcon />}
                        >
                            I received the payment for $543. Should be shipping
                            the item within a couple of hours.
                        </TimelineEvent>
                        <TimelineEvent
                            title="You sent an email to John Doe"
                            createdAt="2016-09-11 09:06 AM"
                            icon={<EmailOutlinedIcon />}
                        >
                            Like we talked, you said that you would share the
                            shipment details? This is an urgent order and so I
                            am losing patience. Can you expedite the process and
                            pls do share the details asap. Consider this a
                            gentle reminder if you are on track already!
                        </TimelineEvent>
                        <TimelineEvent
                            title="John Doe sent a SMS to Text"
                            createdAt="2016-09-12 10:06 PM"
                            icon={<TextsmsOutlinedIcon />}
                        >
                            I received the payment for $543. Should be shipping
                            the item within a couple of hours.
                        </TimelineEvent>
                        <TimelineEvent
                            title="You sent an email to John Doe"
                            createdAt="2016-09-11 09:06 AM"
                            icon={<EmailOutlinedIcon />}
                        >
                            Like we talked, you said that you would share the
                            shipment details? This is an urgent order and so I
                            am losing patience. Can you expedite the process and
                            pls do share the details asap. Consider this a
                            gentle reminder if you are on track already!
                        </TimelineEvent>
                        <TimelineEvent
                            title="John Doe sent a SMS to Text"
                            createdAt="2016-09-12 10:06 PM"
                            icon={<TextsmsOutlinedIcon />}
                        >
                            I received the payment for $543. Should be shipping
                            the item within a couple of hours.
                        </TimelineEvent>
                        <TimelineEvent
                            title="You sent an email to John Doe"
                            createdAt="2016-09-11 09:06 AM"
                            icon={<EmailOutlinedIcon />}
                        >
                            Like we talked, you said that you would share the
                            shipment details? This is an urgent order and so I
                            am losing patience. Can you expedite the process and
                            pls do share the details asap. Consider this a
                            gentle reminder if you are on track already!
                        </TimelineEvent>
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
