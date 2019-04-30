import React, {Component} from 'react';
import styled from "styled-components";
import {GridListTile, Card} from "@material-ui/core";

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
                    {this.props.name}
                </StyledFolderCard>
            </GridListTile>
        );
    }
}

export default FieldCard;
