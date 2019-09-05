import React from 'react';
import {
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        flexGrow: 1,
    },
}));

export default function ContactsMenu() {
    const classes = useStyles();
    return (
        <List className={classes.list}>
            <ListSubheader>A</ListSubheader>
            <ListItem>
                <ListItemText primary="Test" secondary="wewewe" />
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListSubheader>B</ListSubheader>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListSubheader>C</ListSubheader>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListSubheader>D</ListSubheader>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>Test</ListItemText>
            </ListItem>
        </List>
    );
}
