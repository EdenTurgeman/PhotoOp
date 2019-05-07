import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import {List, RootRef} from '@material-ui/core'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import FieldCard from "./FieldCard";
import {swapFields} from "../../Redux/actions/PathActions";

const StyledItemsContainer = styled(List)`
    display: flex;
    max-height: inherit;
    width: inherit;
    flex-flow: column;
    justify-content: center;
    align-items: center;
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
                <Droppable droppableId="usedFieldsId">
                    {provided =>
                        (
                            <RootRef rootRef={provided.innerRef}>
                                <StyledItemsContainer>
                                    {this.props.path.usedFields.map((field, index) =>
                                        <Draggable draggableId={field.alias} key={field.alias} index={index}>
                                            {provided =>
                                                <FieldCard provided={provided}
                                                           innerRef={provided.innerRef}
                                                           index={index}
                                                           field={field}/>
                                            }
                                        </Draggable>
                                    )}
                                    {provided.placeholder}
                                </StyledItemsContainer>
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldsList);

