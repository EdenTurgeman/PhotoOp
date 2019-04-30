import React, {Component} from 'react';
import styled from 'styled-components';
import {addField, removeField} from "../../Redux/actions/PathActions";
import {Add} from '@material-ui/icons';
import {Fab} from '@material-ui/core'
import {connect} from "react-redux";

const StyledStructureContainer = styled.div`
    margin-top: 40px;
    display: flex;
    max-height: 300px;
    width: inherit;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
`

const StyledFab = styled(Fab)`
    right: 20px;
    bottom: 20px;
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
            <StyledStructureContainer style={{width: '100%'}}>
                <StyledStructureContainer>
                    {
                        this.props.path.openFields.map(field => <p>{field.alias}</p>)
                    }
                </StyledStructureContainer>
                <StyledFab>
                    <Add/>
                </StyledFab>
            </StyledStructureContainer>
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

