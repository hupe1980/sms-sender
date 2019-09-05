import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export default function ContactCreate(props) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput autoFocus source="name" />
                <TextInput source="phone" />
            </SimpleForm>
        </Create>
    );
}
