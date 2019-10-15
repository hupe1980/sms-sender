import React from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    makeStyles,
} from '@material-ui/core';
import { useCreate, useRefresh } from 'react-admin';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        padding: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function MessageForm({ contact }) {
    const classes = useStyles();
    const [message, setMessage] = React.useState('');
    const refresh = useRefresh();
    const [create] = useCreate('messages');

    const handleChange = event => setMessage(event.target.value);

    const handleSubmit = async event => {
        event.preventDefault();
        
        const { contactId, name, phone } = contact;
        
        create(
            null,
            { data: { message, contactId, name, phone } },
            {
                onSuccess: () => {
                    setMessage('');
                    refresh();
                },
                undoable: false,
            },
        );
    };

    const numberOfChars = message.length;

    return (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
                id="message"
                label="Message"
                name="message"
                multiline
                fullWidth
                margin="normal"
                variant="outlined"
                value={message}
                onChange={handleChange}
            />
            <Typography color="textSecondary">
                Die Nachricht besteht aus {numberOfChars} Zeichen.
            </Typography>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={numberOfChars === 0}
                    className={classes.submit}
                >
                    Send message
                </Button>
            </Box>
        </form>
    );
}
