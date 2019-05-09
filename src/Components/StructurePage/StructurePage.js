import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import styled from 'styled-components';
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {Add, Delete} from '@material-ui/icons';
import {Fab, RootRef} from '@material-ui/core'
import FieldsSelectDialog from "./FieldsSelectDialog";
import {addField, swapFields} from "../../Redux/actions/PathActions";
import FieldsList from "./FieldsList";

const StyledFab = styled(Fab)`
    &&{
      position: absolute;
      bottom: ${props => props.theme.spacing.unit * 10}px;
      left: ${props => props.theme.spacing.unit * 3}px;
    }
`;

class StructurePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fieldsDialogOpen: false
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.path.usedFields.length === 0 && nextProps.path.usedFields.length > 0) {
            nextProps.onComplete();
        }
    };

    openFieldsList = () => {
        this.setState({fieldsDialogOpen: true});
    };

    closeFieldsList = () => {
        this.setState({fieldsDialogOpen: false});
    };

    onDragEnd = dragResult => {
        if (dragResult.destination) {
            const sourceIndex = dragResult.source.index;
            const destinationIndex = dragResult.destination.index;

            if (sourceIndex !== destinationIndex) {
                this.props.swapFields(sourceIndex, destinationIndex);
            }
        }
    };

    render() {
        return (
            <Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <FieldsList/>
                    <Droppable droppableId="deleteButton">
                        {
                            (provided, snapShot) => {
                                return <RootRef rootRef={provided.innerRef}>
                                    <StyledFab onClick={this.openFieldsList}>
                                        {snapShot.isDraggingOver ? <Delete/> : <Add/>}
                                    </StyledFab>
                                </RootRef>
                            }
                        }
                    </Droppable>
                </DragDropContext>
                <FieldsSelectDialog
                    open={this.state.fieldsDialogOpen}
                    fields={this.props.path.openFields}
                    onClose={this.closeFieldsList}
                    onConfirm={this.props.addField}
                />
            </Fragment>
        )
            ;
    }
}

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

