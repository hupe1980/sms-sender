import React from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    makeStyles,
} from '@material-ui/core';

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

export default function MessageForm() {
    const classes = useStyles();
    const [numberOfChars, setNumberOfChars] = React.useState(0);

    const handleChange = event => setNumberOfChars(event.target.value.length);

    return (
        <form className={classes.form} noValidate>
            <TextField
                id="message"
                label="Message"
                name="message"
                multiline
                fullWidth
                margin="normal"
                variant="outlined"
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
                    className={classes.submit}
                >
                    Send message
                </Button>
            </Box>
        </form>
    );
}
