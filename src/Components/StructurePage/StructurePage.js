import React, {Component} from 'react';
import {StyledSlideContainer} from "../Common/StyledComponents";
import {addField, removeField} from "../../Redux/actions/PathActions";
import {connect} from "react-redux";
import styled from 'styled-components';
import '../../styles/transitions.css';
import FieldCard from "./FieldCard";
import {Add} from '@material-ui/icons'
import {
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    RadioGroup,
    Radio,
    Button,
    FormControlLabel,
    FormControl,
    FormLabel,
    IconButton
} from "@material-ui/core";
import FieldsSelectDialog from "./FieldsSelectDialog";

const StyledFieldsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    flex-flow: column;
    overflow: auto;
`;

class StructurePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fieldsDialogOpen: false
        }
    }

    addUsedField = () => {
        this.props.addField('Shutter Speed');
    };

    openFieldsList = () => {
        this.setState({fieldsDialogOpen: true});
    };

    closeFieldsList = () => {
        this.setState({fieldsDialogOpen: false});
    };

    render() {
        const usedFieldsList = this.props.path.usedFields.map(item => {
            return (
                <FieldCard key={item.alias} name={item.alias}/>
            );
        });

        return (
            <StyledSlideContainer className="transition-item to-page">
                <StyledFieldsContainer>
                    {usedFieldsList}
                    <IconButton onClick={this.openFieldsList}>
                        <Add fontSize="large"/>
                    </IconButton>
                    <FieldsSelectDialog
                        open={this.state.fieldsDialogOpen}
                        fields={this.props.path.openFields}
                        onClose={this.closeFieldsList}
                        onConfirm={this.props.addField}
                    />
                </StyledFieldsContainer>
            </StyledSlideContainer>
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

