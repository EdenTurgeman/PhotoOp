import React, {Component} from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {List, RootRef} from '@material-ui/core'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import FieldCard from "./FieldCard";
import {removeField, swapFields} from "../../Redux/actions/PathActions";

const SyledFieldsList = styled(List)`
    width: inherit;
    overflow: auto;
`;


class FieldsList extends Component {

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
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable style={{overflow: 'auto'}} droppableId="usedFieldsId">
                    {provided =>
                        (
                            <RootRef rootRef={provided.innerRef}>
                                <SyledFieldsList>
                                    {this.props.path.usedFields.map((field, index) =>
                                        <Draggable draggableId={field.alias} key={field.alias} index={index}>
                                            {
                                                provided => {
                                                    const drawArrow = index < this.props.path.usedFields.length - 1;
                                                    return <FieldCard drawArrow={drawArrow}
                                                                      deleteField={this.props.deleteField}
                                                                      provided={provided}
                                                                      innerRef={provided.innerRef}
                                                                      index={index}
                                                                      field={field}/>
                                                }
                                            }
                                        </Draggable>
                                    )}
                                    {provided.placeholder}
                                </SyledFieldsList>
                            </RootRef>
                        )
                    }
                </Droppable>
            </DragDropContext>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.path
    }
};

const mapDispatchToProps = dispatch => {
    return {
        swapFields: (sourceIndex, destinationIndex) => {
            dispatch(swapFields(sourceIndex, destinationIndex));
        },
        deleteField: fieldName => {
            dispatch(removeField(fieldName))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldsList);

