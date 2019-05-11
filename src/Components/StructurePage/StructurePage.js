import React, {Fragment, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {Add, Delete} from '@material-ui/icons';
import {RootRef} from '@material-ui/core'
import FieldsSelectDialog from "./FieldsSelectDialog";
import {addField, swapFields} from "../../Redux/actions/PathActions";
import FieldsList from "./FieldsList";
import {StyledAddFieldFab} from "./StyledComponents";

const StructurePage = props => {
    const [fieldsDialogOpen, setFieldsDialogOpen] = useState(false);

    useEffect(() => {
        props.path.usedFields.length > 0 ? props.onComplete() : props.onCancel();
    }, [props.path.usedFields]);

    const openFieldsList = () => {
        setFieldsDialogOpen(true);
    };

    const closeFieldsList = () => {
        setFieldsDialogOpen(false);
    };

    const onDragEnd = dragResult => {
        if (dragResult.destination) {
            const sourceIndex = dragResult.source.index;
            const destinationIndex = dragResult.destination.index;

            if (sourceIndex !== destinationIndex) {
                props.swapFields(sourceIndex, destinationIndex);
            }
        }
    };

    return (
        <Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <FieldsList/>
                <Droppable droppableId="deleteButton">
                    {
                        (provided, snapShot) => {
                            return <RootRef rootRef={provided.innerRef}>
                                <StyledAddFieldFab onClick={openFieldsList}>
                                    {snapShot.isDraggingOver ? <Delete/> : <Add/>}
                                </StyledAddFieldFab>
                            </RootRef>
                        }
                    }
                </Droppable>
            </DragDropContext>
            <FieldsSelectDialog
                open={fieldsDialogOpen}
                fields={props.path.openFields}
                onClose={closeFieldsList}
                onConfirm={props.addField}
            />
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        path: state.path
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addField: fieldName => {
            dispatch(addField(fieldName));
        },
        swapFields: (sourceIndex, destinationIndex) => {
            dispatch(swapFields(sourceIndex, destinationIndex));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StructurePage);

