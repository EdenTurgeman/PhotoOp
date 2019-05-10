import React, {Component} from 'react';
import {connect} from 'react-redux'
import {RootRef} from '@material-ui/core'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import FieldCard from "./FieldCard";
import {removeField} from "../../Redux/actions/PathActions";
import {SyledFieldsList} from "./StyledComponents";

class FieldsList extends Component {
    render() {
        return (
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
        deleteField: fieldName => {
            dispatch(removeField(fieldName))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldsList);

