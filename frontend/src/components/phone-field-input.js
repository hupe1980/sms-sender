import React from 'react';
import { useInput } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';

const useStyles = makeStyles((theme) => ({
    telephone: {
        marginTop: 16,
    },
}));

const PhoneFieldInput = (props) => {
    const {
        input: { value, name, onChange },
        meta: { touched, error },
        isRequired,
        ...rest
    } = useInput(props);
    const classes = useStyles();

    return (
        <div className={classes.telephone}>
            <MuiPhoneNumber
                defaultCountry={'de'}
                value={value}
                name={name}
                onChange={onChange}
                required={isRequired}
                error={!!(touched && error)}
                helperText={touched && error}
                {...rest}
            />
        </div>
    );
};

export default PhoneFieldInput;
