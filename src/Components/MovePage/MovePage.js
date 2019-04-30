import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import {IconButton} from "@material-ui/core";
import {Add} from "@material-ui/icons";

class MovePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <IconButton>
                    <Add/>
                </IconButton>
            </Fragment>
        );
    }
}

export default MovePage;