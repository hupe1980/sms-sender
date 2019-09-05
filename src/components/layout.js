import React from 'react';
import clsx from 'clsx';
import { Notification, MenuItemLink } from 'react-admin';
import {
    Button,
    Box,
    Drawer,
    Divider,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core';
import AddConversationIcon from '@material-ui/icons/AddCommentOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Header from './header';

import Conversations from './conversations';
import ContactsMenu from './contacts-menu';
import SearchBar from './search-bar';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100vh',
    },
    drawerPaper: {
        width: theme.drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.drawerWidth,
        },
    },
    searchBar: {
        padding: theme.spacing(1),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
}));

export default function Layout({ children }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const conversations = (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            flexGrow="1"
        >
            <Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mx={1}
                    py={2}
                >
                    <Typography variant="h6">Nachrichten</Typography>
                    <Button
                        onClick={toggleDrawer('left', true)}
                        variant="outlined"
                        color="secondary"
                    >
                        <AddConversationIcon
                            className={clsx(
                                classes.leftIcon,
                                classes.iconSmall,
                            )}
                        />
                        Neu
                    </Button>
                </Box>
                <Divider />
                <SearchBar
                    className={classes.searchBar}
                    variant="outlined"
                    placeholder="Namen eingeben"
                />
                <Divider />
                <Conversations />
            </Box>
            <Box>
                <Divider />
                <MenuItemLink to={`/contacts`} primaryText="Kontakte" />
            </Box>
        </Box>
    );

    const contacts = (
        <>
            <div className={classes.toolbarIcon}>
                <IconButton onClick={toggleDrawer('left', false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml={2}
                py={2}
            >
                <Typography variant="h6">Kontakte</Typography>
            </Box>
            <Divider />
            <SearchBar
                className={classes.searchBar}
                variant="outlined"
                placeholder="Namen eingeben"
            />
            <Divider />
            <ContactsMenu />
        </>
    );

    return (
        <div className={classes.root}>
            <Header title="MessageSender">{conversations}</Header>
            <Drawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {contacts}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
            <Notification />
        </div>
    );
}
