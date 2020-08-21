import React from 'react';
import { makeStyles, Typography, ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    event: {
        position: 'relative',
        margin: '10px 0',
        paddingLeft: 45,
        textAlign: 'left',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: -10,
            left: theme.spacing(1),
            width: 2,
            background: theme.palette.primary.main, //'#a0b2b8',
        },
        '&::after': {
            clear: 'both',
            content: '',
            display: 'table',
        },
    },
    eventType: {
        position: 'absolute',
        top: 0,
        borderRadius: '50%',
        width: 30,
        height: 30,
        marginLeft: -6,
        background: theme.palette.background.default,
        border: `2px solid ${theme.palette.primary.main}`,
        display: 'flex',
        left: 0,
    },
    container: {
        position: 'relative',
        '&::before': {
            top: 24,
            left: '100%',
            borderColor: 'transparent',
            borderLeftColor: '#ffffff',
        },
    },
    icon: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        cursor: 'pointer',
        alignSelf: 'center',
        alignItems: 'center',
    },
    title: {},
    subtitle: {},
    createdAt: {},
}));

export default function TimelineEvent({
    children,
    createdAt,
    title,
    subtitle,
    icon,
}) {
    const classes = useStyles();

    return (
        <ListItem className={classes.event}>
            <div className={classes.eventType}>
                <span className={classes.icon}>{icon}</span>
            </div>
            <div className={classes.container}>
                {createdAt && (
                    <Typography
                        variant="body1"
                        className={classes.createdAt}
                        color="textSecondary"
                        component="span"
                        display="block"
                    >
                        {createdAt}
                    </Typography>
                )}
                <Typography
                    variant="h6"
                    className={classes.title}
                    component="span"
                    display="block"
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography
                        variant="body2"
                        className={classes.subtitle}
                        color="textSecondary"
                        component="span"
                        display="block"
                    >
                        {subtitle}
                    </Typography>
                )}
                <Typography paragraph>{children}</Typography>
            </div>
        </ListItem>
    );
}
