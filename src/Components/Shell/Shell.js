import React, {Component} from "react";
import styled from "styled-components";
import TitleBar from "../TitleBar/TitleBar";
import PathPage from "../PathPage/PathPage";
import {Route, Switch} from "react-router";
import PageTransition from "react-router-page-transition";
import StructurePage from "../StructurePage/StructurePage";

const StyledShell = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: space-around;
    align-items: center;
    flex-flow: column;
    overflow: auto;
`;
const StyledContent = styled.div`
    margin-top: 40px;
    justify-content: center;
    height: 100%;
    width: 100%;
    display: flex;
    overflow: auto;
`;

class Shell extends Component {
    render() {
        return (
            <StyledShell>
                <TitleBar/>
                <StyledContent>
                    <Route render={({location}) => (
                            <PageTransition timeout={500}>
                                <Switch location={location}>
                                    <Route exact path="/" component={PathPage}/>
                                    <Route exact path="/tags" component={StructurePage}/>
                                </Switch>
                            </PageTransition>
                        )}/>
                </StyledContent>
            </StyledShell>
        )
    }
}

export default Shell;