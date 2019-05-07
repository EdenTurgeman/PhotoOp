import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import styled from 'styled-components';
import {Add} from '@material-ui/icons';
import {Fab} from '@material-ui/core'
import FieldsSelectDialog from "./FieldsSelectDialog";
import {addField, swapFields} from "../../Redux/actions/PathActions";
import FieldsList from "./FieldsList";

const StyledFab = styled(Fab)`
    background-color: #F9AA33;
    position: fixed;
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
        this.props.addField('MegaPixels');
        this.setState({fieldsDialogOpen: true});
    };

    closeFieldsList = () => {
        this.setState({fieldsDialogOpen: false});
    };

    render() {
        return (
            <Fragment>
                <FieldsList/>
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
        swapFields: (sourceIndex, destinationIndex) => {
            dispatch(swapFields(sourceIndex, destinationIndex));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StructurePage);

