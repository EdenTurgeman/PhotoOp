import React from 'react';
import styled from "styled-components";
import {Card, IconButton, ListItem, RootRef, Typography} from "@material-ui/core";
import {ArrowDownward, Close, DragHandle} from "@material-ui/icons"

const StyledFieldCard = styled(Card)`
    transition: all .1s ease-in;
    transform: scale(${props => props.isDragging ? 0.9 : 1});
    display: flex;
    align-items: center;
    flex-flow: row;
    padding: 0 10px 0 4px;
    text-align: left;
    width: 70%;
    height: 50px;
`;

const StyledFieldListItem = styled(ListItem)`
    && {
      display: flex;
      justify-content: space-between;
      padding: 0;
      flex-flow: column;
    }
`;

const StyledArrow = styled(ArrowDownward)`
  margin: 10px;
  font-size: 30px;
`;

const StyledTrashIconButton = styled(IconButton)`
    && {
      margin-right: 10px;
    }
`;

const StyledDragHandleContainer = styled.p`
  margin-left: auto;
  font-size: 20px;
`;

const FieldCard = props => {
    const {field, provided, snapShot} = props;

    return (
        <RootRef rootRef={props.innerRef}>
            <StyledFieldListItem {...provided.draggableProps}>
                <StyledFieldCard isDragging={snapShot.isDragging}>
                    <StyledTrashIconButton size='small' onClick={() => props.deleteField(field.alias)}>
                        <Close/>
                    </StyledTrashIconButton>
                    <Typography>{field.alias}</Typography>
                    <StyledDragHandleContainer {...provided.dragHandleProps}>
                        <DragHandle/>
                    </StyledDragHandleContainer>
                </StyledFieldCard>
                {props.drawArrow && <StyledArrow color='action'/>}
            </StyledFieldListItem>
        </RootRef>
    );
};

export default FieldCard;
