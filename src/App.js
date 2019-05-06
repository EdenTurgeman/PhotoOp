import React, {Component} from 'react';
import {Provider} from 'react-redux'
import styled, {ThemeProvider} from "styled-components";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import {amber, teal} from '@material-ui/core/colors'

import './styles/App.css';
import Shell from "./Components/Shell/Shell";
import store from "./Redux/store";


const StyledApp = styled.div`
    height: 100%;
    text-align: center;
    justify-content: space-around;
    align-items: center;
    display: flex;
    background-color: ${props => props.theme.palette.primary.main};
    flex-flow: column;
`;

const theme = createMuiTheme({
    palette: {
        primary: {
            main: teal[500],
        },
        secondary: {
            main: amber[500],
        },
        contrastThreshold: 3,
        typography: { useNextVariants: true }
    },
});

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <StyledApp>
                        <Shell/>
                    </StyledApp>
                </Provider>
                </MuiThemeProvider>
            </ThemeProvider>
        );
    }
}

export default App;
