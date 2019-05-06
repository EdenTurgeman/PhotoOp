import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import styled from 'styled-components';
import {Add} from '@material-ui/icons';
import {Fab, List} from '@material-ui/core'
import FieldsSelectDialog from "./FieldsSelectDialog";
import {addField, removeField} from "../../Redux/actions/PathActions";
import FieldCard from "./FieldCard";

const StyledStructureContainer = styled(List)`
    display: flex;
    max-height: 300px;
    width: inherit;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    overflow: auto;
`;

const StyledFab = styled(Fab)`
    background-color: #F9AA33;
    position: fixed;
    float: left;
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

    render() {
        return (
            <Fragment>
                <StyledStructureContainer>
                    {
                        this.props.path.usedFields.map((field, index) => <FieldCard field={field} key={index}/>)
                    }
                </StyledStructureContainer>
                <StyledFab onClick={this.openFieldsList}>
                    <Add/>
                </StyledFab>
                <FieldsSelectDialog
                    open={this.state.fieldsDialogOpen}
                    fields={this.props.path.openFields}
                    onClose={this.closeFieldsList}
                    onConfirm={this.props.addField}
                />
            </Fragment>
        );
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
        removeField: fieldName => {
            dispatch(removeField(fieldName));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StructurePage);

