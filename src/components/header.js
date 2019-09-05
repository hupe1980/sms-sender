import React from 'react';
import { Link } from 'react-router-dom';
import { Greetings } from 'amplify-material-ui';
import {
    Drawer,
    Link as MUILink,
    Divider,
    Hidden,
    IconButton,
    makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'fixed',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${theme.drawerWidth}px)`,
            marginLeft: theme.drawerWidth,
        },
    },
    toolbar: theme.mixins.toolbar,
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        width: theme.drawerWidth,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

export default function Header({ children, title, renderUserMenu }) {
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const burgerMenu = (
        <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
        >
            <MenuIcon />
        </IconButton>
    );

    const brand = (
        <MUILink
            variant="h6"
            underline="none"
            color="inherit"
            component={Link}
            to="/"
        >
            {title}
        </MUILink>
    );

    return (
        <>
            <Greetings
                burgerMenu={burgerMenu}
                title={brand}
                className={classes.appBar}
                renderUserMenu={renderUserMenu}
            />
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerToggle}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    {children}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    variant="permanent"
                    anchor="left"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    {children}
                </Drawer>
            </Hidden>
        </>
    );
}
