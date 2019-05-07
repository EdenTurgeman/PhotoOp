import React, {Component} from 'react';
import styled from "styled-components";
import {Card, ListItem, RootRef} from "@material-ui/core";
import {ArrowDownward} from "@material-ui/icons"

const StyledFolderCard = styled(Card)`
    text-align: center;
    width: 150px;
    height: 40px;
`;


const StyledFieldItem = styled(ListItem)`
    display: flex;
    flex-flow: column;
`;

class FieldCard extends Component {
    render() {
        return (
            <RootRef rootRef={this.props.innerRef}>
                <StyledFieldItem
                    {...this.props.provided.dragHandleProps}
                    {...this.props.provided.draggableProps}>
                    <StyledFolderCard>
                        {this.props.field.alias}
                    </StyledFolderCard>
                    <ArrowDownward/>
                </StyledFieldItem>
            </RootRef>
        );
    }
}

export default FieldCard;
