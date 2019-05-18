import React from 'react';
import {connect} from 'react-redux'
import {RootRef, TextField, Typography} from "@material-ui/core";
import {Close, DragHandle} from "@material-ui/icons"
import {updateField} from "../../Redux/actions/PathActions";
import {
    StyledArrow,
    StyledDragHandleContainer,
    StyledFieldCard,
    StyledFieldListItem,
    StyledTrashIconButton
} from "./StyledComponents";

const folderNamePattern = '([a-zA-Z0-9\\s_\\\\.\\-\\(\\):])+$';

const FieldCard = props => {
    const {field, provided} = props;

    const isFolderNameValid = projectName => new RegExp(folderNamePattern).test(projectName);

    const updateFieldValue = (fieldIndex, fieldValue) => {
        if (isFolderNameValid(fieldValue)) {
            props.updateField(fieldIndex, fieldValue);
        }
    };

    return (
        <RootRef rootRef={provided.innerRef}>
            <StyledFieldListItem {...provided.draggableProps}>
                <StyledFieldCard>
                    <StyledTrashIconButton size='small' onClick={() => props.deleteField(field.alias)}>
                        <Close/>
                    </StyledTrashIconButton>
                    <Typography>{field.alias}</Typography>
                    {field.userInput && <TextField required
                                                   value={field.fieldValue}
                                                   onChange={(event) => updateFieldValue(props.index, event.target.value)}/>}
                    <StyledDragHandleContainer {...provided.dragHandleProps}>
                        <DragHandle/>
                    </StyledDragHandleContainer>
                </StyledFieldCard>
                {props.drawArrow && <StyledArrow color='action'/>}
            </StyledFieldListItem>
        </RootRef>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateField: (fieldIndex, fieldValue) => {
            dispatch(updateField(fieldIndex, fieldValue));
        }

    }
};

// will be changed as soon as the new infrastructure is ready.
export default connect(null, mapDispatchToProps)(FieldCard);
