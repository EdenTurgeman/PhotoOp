import React, {Component} from 'react';
import styled from 'styled-components'
import {Button, Card} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

const StyledFolderCard = styled(Card)`
    width: 300px;
    height: 50px;  
`;

class StructurePage extends Component {
    render() {
        return (
            <StyledFolderCard>
                <Chip></Chip>
            </StyledFolderCard>
        );
    }
}

export default StructurePage;
