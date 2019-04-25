import React, {Component} from 'react';
import styled from 'styled-components'
import {Card} from "@material-ui/core";

import '../SlidingRoute/transitions.css';
import {StyledSlideContainer} from "../Common/StyledComponents";

const StyledFolderCard = styled(Card)`
    width: 300px;
    height: 50px;  
`;

class StructurePage extends Component {
    render() {
        return (
            <StyledSlideContainer className="transition-item to-page">
                <StyledFolderCard>
                </StyledFolderCard>
            </StyledSlideContainer>
        );
    }
}

export default StructurePage;
