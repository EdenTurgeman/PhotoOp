import React, {Component} from 'react';
import styled from "styled-components";
import {GridListTile, Card} from "@material-ui/core";
import {ArrowDownward} from "@material-ui/icons";

const StyledFolderCard = styled(Card)`
    text-align: center;
    width: 150px;
    height: 40px;
    margin-top: 10px;
`;

class FieldCard extends Component {
    render() {
        return (
            <GridListTile>
                <StyledFolderCard>
                    {this.props.field.alias}
                </StyledFolderCard>
                <ArrowDownward/>
            </GridListTile>
        );
    }
}

export default FieldCard;
