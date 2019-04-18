import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import {combineReducers, createStore} from "redux";
import styled from "styled-components";
import {pathReducer} from "./PathPage/pathReducer";
import {Route, Switch} from "react-router";
import PathScreen from "./PathPage/PathPage";

import './App.css';


const StyledApp = styled.div`
    height: 100%;
    text-align: center;
    justify-content: space-around;
    align-items: center;
    display: flex;
    background-color: #FF9800;
    flex-flow: column;
`;

const store = createStore(combineReducers({path: pathReducer}));

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <StyledApp>
                        <Switch>
                            <Route exact path='/' component={PathScreen}/>
                        </Switch>
                    </StyledApp>
                </Provider>
            </BrowserRouter>
        );
    }
}

export default App;
