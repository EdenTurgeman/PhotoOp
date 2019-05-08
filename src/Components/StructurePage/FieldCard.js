import React, {Component} from 'react';
import styled from "styled-components";
import {Card, Fab, ListItem, RootRef} from "@material-ui/core";
import {ArrowDownward, Delete} from "@material-ui/icons"

const StyledFolderCard = styled(Card)`
    text-align: center;
    width: 150px;
    height: 40px;
`;

const StyledFieldItem = styled(ListItem)`
`;

const StyledItemContainer = styled.div`
    display: flex;
    width: inherit;
    justify-content: center;
    padding-right: 50px;
    flex-flow: row;
`;
const StyledCardContainer = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-left: 25px;
`;

class FieldCard extends Component {
    render() {
        return (
            <RootRef rootRef={this.props.innerRef}>
                <StyledFieldItem
                    {...this.props.provided.dragHandleProps}
                    {...this.props.provided.draggableProps}>
                    <StyledItemContainer>
                        <Fab onClick={() => this.props.deleteField(this.props.field.alias)} size={"small"}>
                            <Delete/>
                        </Fab>
                        <StyledCardContainer>
                            <StyledFolderCard>
                                {this.props.field.alias}
                            </StyledFolderCard>
                        </StyledCardContainer>
                    </StyledItemContainer>
                </StyledFieldItem>
            </RootRef>
        );
    }
}

export default FieldCard;
