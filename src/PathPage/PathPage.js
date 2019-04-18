import React, {Component} from 'react';
import {connect} from "react-redux";
import {ArrowDownward} from '@material-ui/icons'
import styled from 'styled-components';
import {setSrc, setDest} from "./pathActions";
import {PathCard} from "./PathCard";

const StyledPathContainer = styled.div`
    width: 350px;
    height: 175px;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
`;

class PathPage extends Component {
    render() {
        return (
            <StyledPathContainer>
                <PathCard setPath={this.props.setSrcPath} path={this.props.path.srcPath} text='Source'/>
                <ArrowDownward fontSize='large' color='disabled'/>
                <PathCard setPath={this.props.setDestPath} path={this.props.path.destPath} text='Destination'/>
            </StyledPathContainer>
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
            dispatch(setSrc(srcPath[0]));
        },
        setDestPath: destPath => {
            dispatch(setDest(destPath[0]));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PathPage);
