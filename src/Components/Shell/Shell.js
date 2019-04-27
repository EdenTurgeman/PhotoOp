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
`;

class Shell extends Component {
    render() {
        return (
            <StyledShell>
                <TitleBar/>
                <Route
                    render={({location}) => (
                        <PageTransition timeout={500}>
                            <Switch location={location}>
                                <Route exact path="/" component={PathPage}/>
                                <Route exact path="/tags" component={StructurePage}/>
                            </Switch>
                        </PageTransition>
                    )}
                />
            </StyledShell>
        )
    }
}

export default Shell;