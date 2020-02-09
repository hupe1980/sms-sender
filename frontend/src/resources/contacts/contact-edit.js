import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

import PhoneFieldInput from '../../components/phone-field-input';

export default function ContactEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput
                    autoFocus
                    source="name"
                    validation={{ require: true }}
                />
                <PhoneFieldInput
                    source="phone"
                    validation={{ require: true }}
                />
            </SimpleForm>
        </Edit>
    );
}
