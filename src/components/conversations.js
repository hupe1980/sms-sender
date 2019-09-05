import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

export default function Conversations() {
    return (
        <List>
            {['Conv1', 'Conv3', 'Conv4'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    );
}
