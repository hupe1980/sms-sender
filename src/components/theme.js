import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const theme = createMuiTheme({
    drawerWidth: 240,
});

export default responsiveFontSizes(theme);
