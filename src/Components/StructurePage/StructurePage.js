import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import {addField, removeField} from "../../Redux/actions/PathActions";
import {Add} from '@material-ui/icons';
import {Fab} from '@material-ui/core'
import {connect} from "react-redux";
import FieldsSelectDialog from "./FieldsSelectDialog";

const StyledStructureContainer = styled.div`
    display: flex;
    max-height: 300px;
    width: inherit;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
`

const StyledFab = styled(Fab)`
    position: fixed;
`;

class StructurePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fieldsDialogOpen: false
        }
    }

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
                        this.props.path.openFields.map(field => <p>{field.alias}</p>)
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

