import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

export default function ContactEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput
                    autoFocus
                    source="name"
                    validation={{ require: true }}
                />
                <TextInput source="phone" validation={{ require: true }} />
            </SimpleForm>
        </Edit>
    );
}
