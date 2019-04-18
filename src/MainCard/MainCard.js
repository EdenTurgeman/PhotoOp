import React, {Component} from 'react';
import styled from 'styled-components'
import {Card} from "@material-ui/core";

const StyledMainCard = styled(Card)`
    width: 300px;
    height: 300px;  
`;

class MainCard extends Component {
    render() {
        return (
            <StyledMainCard>
                LOL
            </StyledMainCard>
        );
    }
}

export default MainCard;
