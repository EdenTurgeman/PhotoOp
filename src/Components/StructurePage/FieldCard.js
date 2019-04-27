import React, {Component} from 'react';
import styled from "styled-components";
import {Card} from "@material-ui/core";

const StyledFolderCard = styled(Card)`
    width: 300px;
    height: 50px;  
`;

class FieldCard extends Component {
    render() {
        return (
            <StyledFolderCard>
                {this.props.name}
            </StyledFolderCard>
        );
    }
}

export default FieldCard;
