import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

import PhoneFieldInput from '../../components/phone-field-input';

export default function ContactCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput autoFocus source="name" />
                <PhoneFieldInput source="phone" />
            </SimpleForm>
        </Create>
    );
}
