import React, {Component} from 'react';
import styled from "styled-components";
import {Card, IconButton, ListItem, RootRef, Typography} from "@material-ui/core";
import {ArrowDownward, Delete, DragHandle} from "@material-ui/icons"

const StyledFieldCard = styled(Card)`
    display: flex;
    align-items: center;
    flex-flow: row;
    padding-left: 4px;
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
`;

const StyledTrashIconButton = styled(IconButton)`
    && {
      margin-right: 10px;
    }
`;

class FieldCard extends Component {
    render() {
        const {field} = this.props;

        return (
            <RootRef rootRef={this.props.innerRef}>
                <StyledFieldListItem classes={{root: {padding: 0}}}
                                     {...this.props.provided.dragHandleProps}
                                     {...this.props.provided.draggableProps}>
                    <StyledFieldCard>
                        <StyledTrashIconButton size='small' onClick={() => this.props.deleteField(field.alias)}>
                            <Delete/>
                        </StyledTrashIconButton>
                        <Typography>{field.alias}</Typography>
                        <DragHandle fontSize='20'/>
                    </StyledFieldCard>
                    {this.props.drawArrow && <StyledArrow fontSize='30px' color='action'/>}
                </StyledFieldListItem>
            </RootRef>
        );
    }
}

export default FieldCard;
