import React from 'react';
import {
    Button,
    Box,
    Typography,
    makeStyles,
} from '@material-ui/core';
import { useCreate, useRefresh } from 'react-admin';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { useAuthContext } from 'amplify-material-ui';

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
    const refresh = useRefresh();
    const [create] = useCreate('messages');
    const { authData } = useAuthContext();

    const submit = async (message) => {
        const { contactId, name, phone } = contact;
        const from = authData.username;

        const data = { message, contactId, name, phone, from }; 
        
        await create(
            { payload: { data } },
            {
                onSuccess: () => {
                    refresh();
                },
                undoable: false,
            },
        );
    };

    return (
        <Formik
            initialValues={{ message: '' }}
            onSubmit={async ({ message }, { setSubmitting, resetForm }) => {
                await submit(message);
                resetForm();
                setSubmitting(false);
            }}
        >
            {({ submitForm, isValid, values }) => (
                <Form className={classes.form}>
                    <Field
                        id="message"
                        label="Message"
                        name="message"
                        multiline
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        component={TextField}
                    />
                    <Typography color="textSecondary">
                        Die Nachricht besteht aus {values.message.length}{' '}
                        Zeichen.
                    </Typography>
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            onClick={submitForm}
                            disabled={!isValid}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Send message
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
