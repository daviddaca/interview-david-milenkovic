import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import GlobalStyles from './globalStyles';

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

function ThemeProvider({ children }) {
    const theme = createTheme({
        typography:{
            fontFamily: "Quicksand"
        }
    });

    return (
        <MUIThemeProvider theme={theme}>
            <GlobalStyles />
            {children}
        </MUIThemeProvider>
    );
}

export default ThemeProvider;