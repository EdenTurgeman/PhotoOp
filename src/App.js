import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import styled from "styled-components";

import './App.css';
import Shell from "./Shell/Shell";
import store from "./Redux/store";


const StyledApp = styled.div`
    height: 100%;
    text-align: center;
    justify-content: space-around;
    align-items: center;
    display: flex;
    background-color: #FF9800;
    flex-flow: column;
`;

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <StyledApp>
                            <Shell/>
                    </StyledApp>
                </Provider>
            </BrowserRouter>
        );
    }
}

export default App;
