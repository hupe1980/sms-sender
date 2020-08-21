import React, { Children, cloneElement } from 'react';
import { makeStyles } from '@material-ui/core';

import { EditButton, ShowButton } from 'react-admin';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        //alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));

export default function ListActionToolbar(props) {
    const { children, ...rest } = props;

    const classes = useStyles();

    return (
        <div className={classes.toolbar}>
            <EditButton {...rest} />
            <ShowButton {...rest} />
            {Children.map(children, (button) => cloneElement(button, rest))}
        </div>
    );
}
