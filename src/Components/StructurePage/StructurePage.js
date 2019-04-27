import React, {Component} from 'react';
import {StyledSlideContainer} from "../Common/StyledComponents";
import {addField, removeField} from "../../Redux/actions/PathActions";
import {connect} from "react-redux";
import styled from 'styled-components';
import '../SlidingRoute/transitions.css';
import FieldCard from "./FieldCard";

const StyledFieldsContainer = styled.div`
    display: flex;
    height: 80%;
    justify-content: space-evenly;
    align-items: center;
    flex-flow: column;
    overflow: auto;
`;

class StructurePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const usedFieldsList = this.props.path.usedFields.map(item => {
            return (
                <FieldCard name={item.alias}/>
            );
        });
        return (
            <StyledSlideContainer className="transition-item to-page">
                <StyledFieldsContainer>
                    {usedFieldsList}
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
        setSrcPath: srcPath => {
            dispatch(addField(srcPath[0]));
        },
        setDestPath: destPath => {
            dispatch(removeField(destPath[0]));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StructurePage);

