import React, {Component} from 'react';
import styled from "styled-components";
import {Card, ListItem} from "@material-ui/core";
import {ArrowDownward} from "@material-ui/icons"

const StyledFolderCard = styled(Card)`
    text-align: center;
    width: 150px;
    height: 40px;
    margin-top: 10px;
`;


const StyledFieldItem = styled(ListItem)`
    display: flex;
    flex-flow: column;
`;

class FieldCard extends Component {
    render() {
        return (
            <StyledFieldItem>
                <StyledFolderCard>
                    {this.props.field.alias}
                </StyledFolderCard>
                <ArrowDownward/>
            </StyledFieldItem>
        );
    }
}

export default FieldCard;
