import React from 'react';
import { makeStyles, List } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        margin: theme.spacing(1),
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: theme.spacing(1),
            width: 2,
            background: theme.palette.primary.main,
        },
        '&::after': {
            content: '',
            display: 'table',
            clear: 'both',
        },
    },
}));

export default function Timeline({ children, orientation = 'left' }) {
    const classes = useStyles();

    return <List className={classes.container}>{children}</List>;
}
