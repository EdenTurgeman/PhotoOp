import React, {Component} from "react";
import styled from "styled-components";
import TitleBar from "../TitleBar/TitleBar";
import PathPage from "../PathPage/PathPage";
import {Route} from "react-router";

const StyledShell = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: space-around;
    align-items: center;
    flex-flow: column;
`;


class Shell extends Component {
    render() {
        return (
            <StyledShell>
                <TitleBar/>
                <Route path='/' component={PathPage}/>
            </StyledShell>
        )
    }
}

export default Shell;