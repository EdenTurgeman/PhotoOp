import React, {Component} from 'react';
import {Provider} from 'react-redux'
import styled from "styled-components";

import './styles/App.css';
import Shell from "./Components/Shell/Shell";
import store from "./Redux/store";


const StyledApp = styled.div`
    height: 100%;
    text-align: center;
    justify-content: space-around;
    align-items: center;
    display: flex;
    background-color: #009688;
    flex-flow: column;
`;

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <StyledApp>
                    <Shell/>
                </StyledApp>
            </Provider>
        );
    }
}

export default App;
